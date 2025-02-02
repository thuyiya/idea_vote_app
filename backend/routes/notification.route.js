const express = require('express');
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/notifications/{userId}:
 *   get:
 *     summary: Get notifications for a user
 *     description: Fetch all notifications for a specific user.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get notifications for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of notifications
 *       400:
 *         description: Error fetching notifications
 */
router.get('/:userId', authMiddleware.authenticateToken, notificationController.getUserNotifications);

/**
 * @swagger
 * /api/notifications/{notificationId}/status:
 *   put:
 *     summary: Mark notification as read
 *     description: Marks a notification as 'Read'.
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: ID of the notification to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       400:
 *         description: Error updating notification
 */
router.put('/:notificationId/status', authMiddleware.authenticateToken, notificationController.updateNotificationStatus);

/**
 * @swagger
 * /api/notifications/:
 *   get:
 *     summary: Get all notifications
 *     description: Fetch all notifications in the system.
 *     tags:
 *       - Notifications
 *     responses:
 *       200:
 *         description: List of all notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   message:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error fetching notifications
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware.authenticateToken, notificationController.getAllNotification);

module.exports = router;
