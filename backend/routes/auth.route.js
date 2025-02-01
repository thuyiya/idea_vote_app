const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     description: Logs in the user by validating email and password. Returns a JWT token upon successful authentication.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: email
 *         description: User's email address
 *         required: true
 *         schema:
 *           type: string
 *           example: "tes2@gmail.com"
 *       - in: body
 *         name: password
 *         description: User's password
 *         required: true
 *         schema:
 *           type: string
 *           example: "12345678"
 *     responses:
 *       200:
 *         description: Successful login and token generation
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             message:
 *               type: string
 *               example: "Successful"
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized Access
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and invalidate JWT token
 *     description: Logs out the user by invalidating the JWT token. Requires a valid token for authentication.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token to authenticate the user
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer <JWT Token>"
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Logged out successfully"
 *       401:
 *         description: Unauthorized Access
 */

router.post('/logout', authMiddleware.authenticateToken, authController.logout);

module.exports = router