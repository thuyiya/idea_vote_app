const express = require('express');
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Get notifications for a specific user
router.get('/:userId', authMiddleware.authenticateToken, notificationController.getUserNotifications);

// Update notification status to 'Read'
router.put('/:notificationId/status', authMiddleware.authenticateToken, notificationController.updateNotificationStatus);

module.exports = router;
