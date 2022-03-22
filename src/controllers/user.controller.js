import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

import User from '@/models/user.model';

// Generate JWT
const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

// @desc  Register new user
// @route POST /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  return res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc  Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (!(user && (await bcrypt.compareSync(password, user.password)))) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  return res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc  Get user data
// @route GET /api/users/me
// @access Private
const getMe = expressAsyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  return res.status(200).json({
    id: _id,
    name,
    email,
  });
});

export { registerUser, loginUser, getMe };
