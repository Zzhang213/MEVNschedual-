const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  leagueName: { type: String, required: true, unique: true },
  description: String,
});

module.exports = mongoose.model('League', leagueSchema);
