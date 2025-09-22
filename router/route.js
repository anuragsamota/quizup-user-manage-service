//router/router.js

import { Router } from "express";
import * as controller from '../controllers/controller.js';

const router = Router();



import { auth } from '../controllers/controller.js';
import passport from '../passport.js';

// Auth
router.post('/register', controller.register);
router.post('/login', controller.login); // passport-local used in controller

// Profile (passport-jwt protected)
router.get('/profile', auth, controller.getProfile);
router.put('/profile', auth, controller.updateProfile);

// Quiz history (passport-jwt protected)
router.get('/history', auth, controller.getQuizHistory);
router.post('/history', auth, controller.addQuizHistory);

export default router;