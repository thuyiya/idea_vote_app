const express = require('express');
const voteController = require('../controllers/vote.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/votes/create:
 *   post:
 *     summary: Create a vote for an idea
 *     description: Allows an authenticated user to vote for an idea. Requires a valid JWT token.
 *     tags:
 *       - Vote
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ideaId:
 *                 type: string
 *                 description: ID of the idea to vote for
 *                 example: "617f0ef3c0a44f0b4e2338a9"
 *     responses:
 *       201:
 *         description: Vote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote created successfully"
 *       401:
 *         description: Unauthorized Access
 */
router.post('/create', authMiddleware.authenticateToken, voteController.createVote);

/**
 * @swagger
 * /api/votes/{ideaId}/votes:
 *   get:
 *     summary: Get vote count for an idea
 *     description: Fetches the total number of votes for a specific idea.
 *     tags:
 *       - Vote
 *     parameters:
 *       - in: path
 *         name: ideaId
 *         description: The ID of the idea to fetch vote count for
 *         required: true
 *         schema:
 *           type: string
 *           example: "617f0ef3c0a44f0b4e2338a9"
 *     responses:
 *       200:
 *         description: Total number of votes for the idea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ideaId:
 *                   type: string
 *                   example: "617f0ef3c0a44f0b4e2338a9"
 *                 votesCount:
 *                   type: integer
 *                   example: 25
 *       404:
 *         description: Idea not found
 *       401:
 *         description: Unauthorized Access
 */
router.get('/:ideaId/votes', authMiddleware.authenticateToken, voteController.getVotesForIdea);

/**
 * @swagger
 * /api/votes/{id}:
 *   delete:
 *     summary: Remove a vote for an idea
 *     description: Allows an authenticated user to remove their vote for an idea.
 *     tags:
 *       - Vote
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the vote to remove
 *         required: true
 *         schema:
 *           type: string
 *           example: "617f0ef3c0a44f0b4e2338a9"
 *     responses:
 *       200:
 *         description: Vote removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote removed successfully"
 *       404:
 *         description: Vote not found
 *       401:
 *         description: Unauthorized Access
 */
router.delete('/remove/:id', authMiddleware.authenticateToken, voteController.removeVote);

/**
 * @swagger
 * /api/votes/all:
 *   get:
 *     summary: Get all votes
 *     description: Fetches a list of all votes from the system.
 *     tags:
 *       - Vote
 *     responses:
 *       200:
 *         description: List of all votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   ideaId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized Access
 */
router.get('/all', authMiddleware.authenticateToken, voteController.getAllVotes);

/**
 * @swagger
 * /api/votes:
 *   get:
 *     summary: Get votes made by the authenticated user
 *     description: Fetches the list of votes made by the currently authenticated user.
 *     tags:
 *       - Vote
 *     responses:
 *       200:
 *         description: List of votes made by the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   ideaId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized Access
 */
router.get('/', authMiddleware.authenticateToken, voteController.getMyVotes);

/**
 * @swagger
 * /api/votes/best:
 *   get:
 *     summary: Get the best ideas by votes
 *     description: Fetches the ideas with the highest number of votes.
 *     tags:
 *       - Vote
 *     responses:
 *       200:
 *         description: List of best ideas by votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ideaId:
 *                     type: string
 *                   votesCount:
 *                     type: integer
 *       401:
 *         description: Unauthorized Access
 */
router.get('/best', authMiddleware.authenticateToken, voteController.getBestIdeasByVotes);

module.exports = router;
