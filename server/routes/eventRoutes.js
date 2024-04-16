const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticateToken = require('../middlewares/authenticateToken');


router.post('/', authenticateToken,eventController.createEvent);
router.get('/',  eventController.getAllEvents);
router.get('/:id', authenticateToken, eventController.getEventById);
router.put('/:id', authenticateToken, eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);

module.exports = router;
