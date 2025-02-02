const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authMiddleware.authenticateToken, userController.createUser);
router.get('/all', authMiddleware.authenticateToken, userController.getAllUsers);
router.get('/lastMonth', authMiddleware.authenticateToken, userController.getThisMonthRegisteredEmployees);

module.exports = router