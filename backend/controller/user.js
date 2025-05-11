import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({message: 'All fields are required'});
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.status(201).json({token, user: newUser});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const createUser = async (req, res) => {
  try {
    const {name, email, access, password, parentId} = req.body;

    if (!name || !email || !access || !password || !parentId) {
      return res.status(400).json({message: 'All fields are required'});
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      access,
      password: hashedPassword,
      parentId,
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.status(201).json({token, user: newUser});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Email and password are required'});
    }

    const user = await User.findOne({email, status: true});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({message: 'Invalid credentials or account inactive'});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.status(200).json({token, user});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const updatePassword = async (req, res) => {
  const {password} = req.body;

  if (!password) {
    return res.status(400).json({message: 'Password is required'});
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({message: 'Password updated successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({_id: {$ne: loggedInUserId}});

    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, email, access, status, parentId} = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(400).json({message: 'Email already in use'});
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (access) user.access = access;
    if (status !== undefined) user.status = status;
    if (parentId) user.parentId = parentId;

    await user.save();

    res.status(200).json({message: 'User updated successfully', user});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error updating user', error: error.message});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error deleting user', error: error.message});
  }
};
