import express, { Request, Response } from 'express';
import Idea from '../models/Idea';
import User from '../models/User';

const router = express.Router();

// Create a new idea
router.post('/', async (req: Request, res: Response) => {
    const { title, description, userId } = req.body;

    try {
        const newIdea = new Idea({ title, description, userId });
        await newIdea.save();
        res.status(201).json(newIdea);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create idea' });
    }
});

// Get all ideas
router.get('/', async (req: Request, res: Response) => {
    try {
        const ideas = await Idea.find().populate('userId').populate('approvedUserIds');
        res.json(ideas);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ideas' });
    }
});

// Update an idea's status (Only admin/manager can approve/reject)
router.put('/:id', async (req: Request, res: Response) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        // TypeScript now knows `req.user` exists!
        const user = await User.findById(req.user?.userId);

        if (user?.role !== 'admin' && user?.role !== 'manager') {
            res.status(403).json({ error: 'Only admins or managers can approve or reject ideas' });
            return;
        }

        const idea = await Idea.findById(id);
        if (!idea) {
            res.status(404).json({ error: 'Idea not found' });
            return;
        }

        // Update status
        idea.status = status;
        if (status === 'Approved' || status === 'Rejected') {
            idea.updatedAt = new Date();
        }

        // Add user to approvedUserIds
        if (status === 'Approved' && !idea.approvedUserIds.includes(user.id)) {
            idea.approvedUserIds.push(user.id);
        }

        await idea.save();
        res.json(idea);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update idea status' });
    }
});

// Delete an idea
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const idea = await Idea.findById(id);
        if (!idea) {
            res.status(404).json({ error: 'Idea not found' });
            return;
        }

        await Idea.deleteOne({ _id: idea.id });
        res.json({ message: 'Idea deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete idea' });
    }
});

export default router;