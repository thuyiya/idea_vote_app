const express = require('express');
const ideaController = require('../controllers/idea.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/ideas/create:
 *   post:
 *     summary: Create a new idea
 *     description: Allows users to create a new idea.
 *     tags:
 *       - Ideas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Idea created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/create', authMiddleware.authenticateToken, ideaController.createIdea);

/**
 * @swagger
 * /api/ideas/all:
 *   get:
 *     summary: Get all ideas
 *     description: Fetches all ideas from the system.
 *     tags:
 *       - Ideas
 *     responses:
 *       200:
 *         description: List of ideas
 *       400:
 *         description: Error fetching ideas
 *       401:
 *         description: Unauthorized
 */
router.get('/all', authMiddleware.authenticateToken, ideaController.getAllIdeas);

/**
 * @swagger
 * /api/ideas/{ideaId}/status:
 *   put:
 *     summary: Update idea status
 *     description: Allows updating the status of a specific idea (e.g., approve, reject, neutral).
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: ideaId
 *         description: ID of the idea to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "617f0ef3c0a44f0b4e2338a9"
 *       - in: body
 *         name: status
 *         description: New status for the idea
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: [Approve, Reject, Neutral]
 *               example: "Approve"
 *     responses:
 *       200:
 *         description: Idea status updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Idea status updated successfully"
 *       400:
 *         description: Invalid status or idea not found
 *       401:
 *         description: Unauthorized Access
 */
router.put('/:ideaId/status', authMiddleware.authenticateToken, ideaController.updateIdeaStatus);

/**
 * @swagger
 * /api/ideas/{id}:
 *   delete:
 *     summary: Remove an idea
 *     description: Allows users to remove a specific idea from the system.
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the idea to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "617f0ef3c0a44f0b4e2338a9"
 *     responses:
 *       200:
 *         description: Idea removed successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Idea removed successfully"
 *       404:
 *         description: Idea not found
 *       401:
 *         description: Unauthorized Access
 */
router.delete('/:id', authMiddleware.authenticateToken, ideaController.removeIdea);

/**
 * @swagger
 * /api/ideas/{id}:
 *   put:
 *     summary: Update an idea
 *     description: Allows users to update an existing idea's details.
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the idea to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "617f0ef3c0a44f0b4e2338a9"
 *       - in: body
 *         name: idea
 *         description: Updated idea information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Updated Idea Title"
 *             description:
 *               type: string
 *               example: "Updated description of the idea"
 *     responses:
 *       200:
 *         description: Idea updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Idea updated successfully"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized Access
 */
router.put('/:id', authMiddleware.authenticateToken, ideaController.updateIdea);

/**
 * @swagger
 * /api/ideas/all/{status}:
 *   get:
 *     summary: Get ideas by status
 *     description: Fetches all ideas with a specific status (e.g., approved, rejected, neutral).
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: status
 *         description: Status of ideas to fetch (Approve, Reject, Neutral)
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Approve, Reject, Neutral]
 *           example: "Approve"
 *     responses:
 *       200:
 *         description: List of ideas by status
 *       400:
 *         description: Error fetching ideas
 *       401:
 *         description: Unauthorized Access
 */
router.get('/all/:status', authMiddleware.authenticateToken, ideaController.getIdeasByStatus);

module.exports = router;
