const express = require('express');
const ideaController = require('../controllers/idea.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Create an idea
router.post('/create', authMiddleware.authenticateToken, ideaController.createIdea);

// Get all ideas
router.get('/all', authMiddleware.authenticateToken, ideaController.getAllIdeas);

// Update idea status
router.put('/:ideaId/status', authMiddleware.authenticateToken, ideaController.updateIdeaStatus);

// Remove an idea
router.delete('/:id', authMiddleware.authenticateToken, ideaController.removeIdea);

module.exports = router;
