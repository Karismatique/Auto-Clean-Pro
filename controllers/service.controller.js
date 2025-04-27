// controllers/service.controller.js
const { Service } = require('../models');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    if (!name || !price || !duration) {
      return res.status(400).json({ message: 'Name, price, and duration are required' });
    }
    const service = await Service.create({
      name,
      description,
      price,
      duration,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration } = req.body;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.update({
      name: name || service.name,
      description: description || service.description,
      price: price || service.price,
      duration: duration || service.duration,
      updated_at: new Date()
    });
    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};