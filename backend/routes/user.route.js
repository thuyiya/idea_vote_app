const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/all', authMiddleware.authenticateToken, userController.getAllUsers);

module.exports = router