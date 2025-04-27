// controllers/global_admin.controller.js
const { GlobalAdmin } = require('../models');

const getAllGlobalAdmins = async (req, res) => {
  try {
    const globalAdmins = await GlobalAdmin.findAll();
    res.status(200).json(globalAdmins);
  } catch (error) {
    console.error('Error fetching global admins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getGlobalAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const globalAdmin = await GlobalAdmin.findByPk(id);
    if (!globalAdmin) {
      return res.status(404).json({ message: 'Global admin not found' });
    }
    res.status(200).json(globalAdmin);
  } catch (error) {
    console.error('Error fetching global admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createGlobalAdmin = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }
    const globalAdmin = await GlobalAdmin.create({
      full_name,
      email,
      password, // Should be hashed in production
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(globalAdmin);
  } catch (error) {
    console.error('Error creating global admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateGlobalAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, password } = req.body;
    const globalAdmin = await GlobalAdmin.findByPk(id);
    if (!globalAdmin) {
      return res.status(404).json({ message: 'Global admin not found' });
    }
    await globalAdmin.update({
      full_name: full_name || globalAdmin.full_name,
      email: email || globalAdmin.email,
      password: password || globalAdmin.password,
      updated_at: new Date()
    });
    res.status(200).json(globalAdmin);
  } catch (error) {
    console.error('Error updating global admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteGlobalAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const globalAdmin = await GlobalAdmin.findByPk(id);
    if (!globalAdmin) {
      return res.status(404).json({ message: 'Global admin not found' });
    }
    await globalAdmin.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting global admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllGlobalAdmins,
  getGlobalAdminById,
  createGlobalAdmin,
  updateGlobalAdmin,
  deleteGlobalAdmin
};