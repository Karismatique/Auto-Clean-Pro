// controllers/appointment_extras.controller.js
const { AppointmentExtra } = require('../models');

const getAllAppointmentExtras = async (req, res) => {
  try {
    const appointmentExtras = await AppointmentExtra.findAll();
    res.status(200).json(appointmentExtras);
  } catch (error) {
    console.error('Error fetching appointment extras:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAppointmentExtra = async (req, res) => {
  try {
    const { appointment_id, extra_id } = req.body;
    if (!appointment_id || !extra_id) {
      return res.status(400).json({ message: 'Appointment ID and Extra ID are required' });
    }
    const appointmentExtra = await AppointmentExtra.create({
      appointment_id,
      extra_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(appointmentExtra);
  } catch (error) {
    console.error('Error creating appointment extra:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAppointmentExtra = async (req, res) => {
  try {
    const { appointment_id, extra_id } = req.query;
    if (!appointment_id || !extra_id) {
      return res.status(400).json({ message: 'Appointment ID and Extra ID are required' });
    }
    const appointmentExtra = await AppointmentExtra.findOne({
      where: { appointment_id, extra_id }
    });
    if (!appointmentExtra) {
      return res.status(404).json({ message: 'Appointment extra not found' });
    }
    await appointmentExtra.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting appointment extra:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllAppointmentExtras,
  createAppointmentExtra,
  deleteAppointmentExtra
};