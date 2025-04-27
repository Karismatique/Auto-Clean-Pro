// controllers/agency.controller.js
const { Agency } = require('../models');

const getAllAgencies = async (req, res) => {
  try {
    const agencies = await Agency.findAll();
    res.status(200).json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await Agency.findByPk(id);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.status(200).json(agency);
  } catch (error) {
    console.error('Error fetching agency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAgency = async (req, res) => {
  try {
    const { name, address, city, opening_hours } = req.body;
    if (!name || !address || !city) {
      return res.status(400).json({ message: 'Name, address, and city are required' });
    }
    const agency = await Agency.create({
      name,
      address,
      city,
      opening_hours,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(agency);
  } catch (error) {
    console.error('Error creating agency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, opening_hours } = req.body;
    const agency = await Agency.findByPk(id);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    await agency.update({
      name: name || agency.name,
      address: address || agency.address,
      city: city || agency.city,
      opening_hours: opening_hours || agency.opening_hours,
      updated_at: new Date()
    });
    res.status(200).json(agency);
  } catch (error) {
    console.error('Error updating agency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await Agency.findByPk(id);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    await agency.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting agency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency
};