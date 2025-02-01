const express = require('express');
const ideaController = require('../controllers/idea.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Create an idea
router.post('/create', authMiddleware.authenticateToken, ideaController.createIdea);

// Get all ideas
router.get('/all', authMiddleware.authenticateToken, ideaController.getAllIdeas);

// Remove an idea
router.delete('/:ideaId', authMiddleware.authenticateToken, ideaController.removeIdea);

module.exports = router;
