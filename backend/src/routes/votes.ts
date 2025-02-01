import express, { Request, Response } from 'express';
import Vote from '../models/Vote';
import Idea from '../models/Idea';

const router = express.Router();

// Create a new vote
router.post('/', async (req: Request, res: Response) => {
    const { userId, ideaId, voteType } = req.body;

    try {
        const idea = await Idea.findById(ideaId);
        if (!idea) { 
            res.status(404).json({ error: 'Idea not found' });}

        const existingVote = await Vote.findOne({ userId, ideaId });
        if (existingVote) {
             res.status(400).json({ error: 'User has already voted on this idea' });
            }

        const newVote = new Vote({ userId, ideaId, voteType });
        await newVote.save();
        res.status(201).json(newVote);  // Make sure to return the response
    } catch (err) {
        res.status(500).json({ error: 'Failed to register vote' });
    }
});

// Get all votes for an idea
router.get('/:ideaId', async (req: Request, res: Response) => {
    const { ideaId } = req.params;

    try {
        const votes = await Vote.find({ ideaId }).populate('userId');
         res.json(votes);  // Make sure to return the response
    } catch (err) {
         res.status(500).json({ error: 'Failed to fetch votes' });
    }
});

export default router;
