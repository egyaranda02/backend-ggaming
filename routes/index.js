const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/GameController');

router.get('/games', gamesController.getGames);
router.get('/games/:id', gamesController.getGames);
router.get('/recommendation', gamesController.getSuggestion);
router.get('/search', gamesController.getSearch);

module.exports = router;