import express from 'express';

import { Signup, LogIn , LogOut } from '../controllers/user.controller.js';
const router = express.Router();

// Signup route
router.post('/signup', Signup);

// Login route
router.post('/login', LogIn);

// LogOut route
router.get('/logout', LogOut);


export default router;