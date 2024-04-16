const League = require('../models/League');

async function createLeague(req, res) {
  const { leagueName, description } = req.body;

  try {
    const newLeague = new League({ leagueName, description });
    await newLeague.save();
    res.status(201).json(newLeague);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllLeagues(req, res) {
  try {
    const leagues = await League.find();
    res.json(leagues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getLeagueById(req, res) {
  const { id } = req.params;

  try {
    const league = await League.findById(id);
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json(league);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateLeague(req, res) {
  const { id } = req.params;
  const { leagueName, description } = req.body;

  try {
    const updatedLeague = await League.findByIdAndUpdate(id, { leagueName, description }, { new: true });
    if (!updatedLeague) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json(updatedLeague);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteLeague(req, res) {
  const { id } = req.params;

  try {
    const deletedLeague = await League.findByIdAndDelete(id);
    if (!deletedLeague) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json({ message: 'League deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createLeague, getAllLeagues, getLeagueById, updateLeague, deleteLeague };
