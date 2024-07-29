const express = require('express');
const { Signup, Login, LogOut } = require('../controllers/user.controller.js');
const router = express.Router();

// Signup route
router.post('/signup', Signup);

// Login route
router.post('/login', Login);

// LogOut route
router.get('/logout', LogOut);


module.exports = router;