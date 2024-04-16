const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  description: String,
});

module.exports = mongoose.model('Team', teamSchema);
