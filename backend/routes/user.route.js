const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Allows users to register in the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/register', authMiddleware.authenticateToken, userController.createUser);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     description: Fetches a list of all users from the system.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error fetching users
 *       401:
 *         description: Unauthorized
 */
router.get('/all', authMiddleware.authenticateToken, userController.getAllUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Fetches the profile information of the currently authenticated user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User profile information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Error fetching profile
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authMiddleware.authenticateToken, userController.getProfile);

/**
 * @swagger
 * /api/users/lastMonth:
 *   get:
 *     summary: Get users registered in the last month
 *     description: Fetches a list of users who registered in the last month.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users registered last month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Error fetching users
 *       401:
 *         description: Unauthorized
 */
router.get('/lastMonth', authMiddleware.authenticateToken, userController.getThisMonthRegisteredEmployees);

module.exports = router;
