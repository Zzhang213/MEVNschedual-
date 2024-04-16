const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes'); 
const leagueRoutes = require('./routes/leagueRoutes');
const eventRoutes = require('./routes/eventRoutes');


const app = express();
const PORT = 5111;

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));


app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION_STRING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);
app.use('/leagues', leagueRoutes); 
app.use('/events', eventRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
