

import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from '../passport.js';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Register a new user
export async function register(req, res) {
	try {
		const { username, email, password, name } = req.body;
		if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
		const exists = await User.findOne({ $or: [{ username }, { email }] });
		if (exists) return res.status(409).json({ error: 'Username or email already exists' });
		const hash = await bcrypt.hash(password, 10);
		const user = new User({ username, email, password: hash, name });
		await user.save();
		res.status(201).json({ msg: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// Login using Passport local strategy
export function login(req, res, next) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });
		// Issue JWT
		const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
		res.json({ token });
	})(req, res, next);
}

// Get user profile (by token)
export async function getProfile(req, res) {
	// req.user is set by passport-jwt
	res.json(req.user);
}

// Update user profile
export async function updateProfile(req, res) {
	try {
		const { name, avatar } = req.body;
		const user = await User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true }).select('-password');
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// Get quiz history
export async function getQuizHistory(req, res) {
	try {
		const user = await User.findById(req.user._id).select('quizHistory');
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json(user.quizHistory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// Add quiz attempt to history
export async function addQuizHistory(req, res) {
	try {
		const { quizId, score, answers } = req.body;
		const user = await User.findById(req.user._id);
		if (!user) return res.status(404).json({ error: 'User not found' });
		user.quizHistory.push({ quizId, score, answers });
		await user.save();
		res.json({ msg: 'Quiz history updated' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// Passport JWT middleware for protected routes
import passportInstance from '../passport.js';
export const auth = passportInstance.authenticate('jwt', { session: false });
