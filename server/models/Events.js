const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    sports: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isLeagueMatch: {
        type: Boolean,
        default: false
    },
    selectedLeague: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League', // Reference to the League model
        default: null
    },
    selectedTeam1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', // Reference to the Team model
        default: null
    },
    selectedTeam2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', // Reference to the Team model
        default: null
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
