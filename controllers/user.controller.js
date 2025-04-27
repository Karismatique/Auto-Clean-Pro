// controllers/user.controller.js
const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { full_name, email, password, phone, address, favorite_agency_id, profile_picture } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }
    const user = await User.create({
      full_name,
      email,
      password, // Should be hashed in production
      phone,
      address,
      favorite_agency_id,
      profile_picture,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, password, phone, address, favorite_agency_id, profile_picture } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({
      full_name: full_name || user.full_name,
      email: email || user.email,
      password: password || user.password,
      phone: phone || user.phone,
      address: address || user.address,
      favorite_agency_id: favorite_agency_id || user.favorite_agency_id,
      profile_picture: profile_picture || user.profile_picture,
      updated_at: new Date()
    });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};