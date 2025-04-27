// controllers/agency_admin.controller.js
const { AgencyAdmin } = require('../models');

const getAllAgencyAdmins = async (req, res) => {
  try {
    const agencyAdmins = await AgencyAdmin.findAll();
    res.status(200).json(agencyAdmins);
  } catch (error) {
    console.error('Error fetching agency admins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAgencyAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const agencyAdmin = await AgencyAdmin.findByPk(id);
    if (!agencyAdmin) {
      return res.status(404).json({ message: 'Agency admin not found' });
    }
    res.status(200).json(agencyAdmin);
  } catch (error) {
    console.error('Error fetching agency admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAgencyAdmin = async (req, res) => {
  try {
    const { agency_id, full_name, email, password } = req.body;
    if (!agency_id || !full_name || !email || !password) {
      return res.status(400).json({ message: 'Agency ID, full name, email, and password are required' });
    }
    const agencyAdmin = await AgencyAdmin.create({
      agency_id,
      full_name,
      email,
      password, // Should be hashed in production
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(agencyAdmin);
  } catch (error) {
    console.error('Error creating agency admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAgencyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { agency_id, full_name, email, password } = req.body;
    const agencyAdmin = await AgencyAdmin.findByPk(id);
    if (!agencyAdmin) {
      return res.status(404).json({ message: 'Agency admin not found' });
    }
    await agencyAdmin.update({
      agency_id: agency_id || agencyAdmin.agency_id,
      full_name: full_name || agencyAdmin.full_name,
      email: email || agencyAdmin.email,
      password: password || agencyAdmin.password,
      updated_at: new Date()
    });
    res.status(200).json(agencyAdmin);
  } catch (error) {
    console.error('Error updating agency admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAgencyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const agencyAdmin = await AgencyAdmin.findByPk(id);
    if (!agencyAdmin) {
      return res.status(404).json({ message: 'Agency admin not found' });
    }
    await agencyAdmin.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting agency admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllAgencyAdmins,
  getAgencyAdminById,
  createAgencyAdmin,
  updateAgencyAdmin,
  deleteAgencyAdmin
};