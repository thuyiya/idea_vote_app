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
 *     parameters:
 *       - in: body
 *         name: ideaId
 *         description: ID of the idea to vote for
 *         required: true
 *         schema:
 *           type: string
 *           example: "617f0ef3c0a44f0b4e2338a9"
 *     responses:
 *       201:
 *         description: Vote created successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Vote created successfully"
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
 *         schema:
 *           type: object
 *           properties:
 *             ideaId:
 *               type: string
 *               example: "617f0ef3c0a44f0b4e2338a9"
 *             votesCount:
 *               type: integer
 *               example: 25
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
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Vote removed successfully"
 *       404:
 *         description: Vote not found
 *       401:
 *         description: Unauthorized Access
 */

router.delete('/remove/:id', authMiddleware.authenticateToken, voteController.removeVote);
router.get('/all', authMiddleware.authenticateToken, voteController.getAllVotes);
router.get('/', authMiddleware.authenticateToken, voteController.getMyVotes);
router.get('/best', authMiddleware.authenticateToken, voteController.getBestIdeasByVotes);

module.exports = router;
