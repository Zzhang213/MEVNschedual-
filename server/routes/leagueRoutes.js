const express = require('express');
const leagueController = require('../controllers/leagueController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.use(authenticateToken);

router.post('/', leagueController.createLeague);
router.get('/', leagueController.getAllLeagues);
router.get('/:id', leagueController.getLeagueById);
router.put('/:id', leagueController.updateLeague);
router.delete('/:id', leagueController.deleteLeague);

module.exports = router;
