const Team = require('../models/Team');

async function createTeam(req, res) {
  const { teamName, description } = req.body;

  try {
    // Check if team with the same name already exists
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team with this name already exists' });
    }

    // Team does not exist, create a new team
    const newTeam = new Team({ teamName, description });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllTeams(req, res) {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getTeamById(req, res) {
  const { id } = req.params;

  try {
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateTeam(req, res) {
  const { id } = req.params;
  const { teamName, description } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, { teamName, description }, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteTeam(req, res) {
  const { id } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };
