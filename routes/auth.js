import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure to use .js extension for ES modules
const router = express.Router();

// Register route
router.post('/signup', async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const existingUser  = await User.findOne({ mobile });
        if (existingUser ) {
            return res.status(400).json({ error: 'Mobile number already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser  = new User({ mobile, password: hashedPassword });

        await newUser .save();

        const token = jwt.sign({ userId: newUser ._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'User  registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

export default router; // Ensure to export the router