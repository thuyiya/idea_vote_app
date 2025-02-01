// backend/src/routes/auth.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register (only for admin)
router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    // Check if the requester is an admin
    const requester = await User.findById(req.user?.userId);
    if (requester?.role !== 'admin') {
         res.status(403).json({ error: 'Only admin can create accounts' });
        return
    }

    try {
        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
             res.status(401).json({ error: 'Invalid credentials' });
            return
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;