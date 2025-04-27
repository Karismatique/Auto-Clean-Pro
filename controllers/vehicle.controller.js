// controllers/vehicle.controller.js
const { Vehicle } = require('../models');

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createVehicle = async (req, res) => {
  try {
    const { user_id, brand, model, license_plate, vehicle_type } = req.body;
    if (!user_id || !brand || !model || !license_plate || !vehicle_type) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const vehicle = await Vehicle.create({
      user_id,
      brand,
      model,
      license_plate,
      vehicle_type,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, brand, model, license_plate, vehicle_type } = req.body;
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    await vehicle.update({
      user_id: user_id || vehicle.user_id,
      brand: brand || vehicle.brand,
      model: model || vehicle.model,
      license_plate: license_plate || vehicle.license_plate,
      vehicle_type: vehicle_type || vehicle.vehicle_type,
      updated_at: new Date()
    });
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    await vehicle.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};