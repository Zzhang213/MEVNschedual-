const Event = require('../models/Events');

// Create a new event
async function createEvent(req, res) {
  const eventData = req.body;
  try {
    const newEvent = await Event.create(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get all events
async function getAllEvents(req, res) {
  try {
    const events = await Event.find().populate('selectedLeague selectedTeam1 selectedTeam2');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get event by ID
async function getEventById(req, res) {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('selectedLeague selectedTeam1 selectedTeam2');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update event by ID
async function updateEvent(req, res) {
  const { id } = req.params;
  const eventData = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, eventData, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete event by ID
async function deleteEvent(req, res) {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
