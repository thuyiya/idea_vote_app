const express = require('express');
const voteController = require('../controllers/vote.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Create a vote (Vote for an idea)
router.post('/create', authMiddleware.authenticateToken, voteController.createVote);

// Get vote count for an idea
router.get('/:ideaId/votes', authMiddleware.authenticateToken, voteController.getVotesForIdea);

// Remove vote for an idea
router.delete('/:id', authMiddleware.authenticateToken, voteController.removeVote);

module.exports = router;
