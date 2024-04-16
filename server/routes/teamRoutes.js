const express = require('express');
const teamController = require('../controllers/teamController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();
router.use(authenticateToken);

router.post('/', teamController.createTeam);
router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
