const express = require('express');
const bcryptjs = require("bcryptjs")

const jwt = require('jsonwebtoken');

// User model
const User = require('../models/user.model.js');
const errorHandler = require('../utils/error.js');


const Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Input validation
    if (!name || !email || !password) {
      return next(errorHandler(400, { error: 'Please fill in all fields' }));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User Already Exisit"))
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
    .cookie('access_token', token, { httpOnly: true })
    .status(201)
    .json({ rest, message: 'User created successfully' ,token});
  } catch (error) {
    next(error)
  }
}

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Input validation
    if (!email || !password) {
      return next(errorHandler(401, { error: 'Please fill in all fields' }));
    }
    
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, { error: 'User not found' }));
    }
    
    // Check password
    const isValid = bcryptjs.compareSync(password, user.password);
    if (!isValid) {
      return next(errorHandler(401, { error: 'Invalid password' }));
    }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(201)
        .json({rest,message : "Login Sucessfully",token});
    
    
  } catch (error) {
    next(error)
  }
}


const LogOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
module.exports = { Login, Signup , LogOut };
