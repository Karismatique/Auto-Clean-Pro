// controllers/appointment.controller.js
const { Appointment } = require('../models');

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { user_id, vehicle_id, agency_id, service_id, appointment_date, status, total_price } = req.body;
    if (!user_id || !vehicle_id || !agency_id || !service_id || !appointment_date || !total_price) {
      return res.status(400).json({ message: 'All fields except status are required' });
    }
    const appointment = await Appointment.create({
      user_id,
      vehicle_id,
      agency_id,
      service_id,
      appointment_date,
      status: status || 'pending',
      total_price,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, vehicle_id, agency_id, service_id, appointment_date, status, total_price } = req.body;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.update({
      user_id: user_id || appointment.user_id,
      vehicle_id: vehicle_id || appointment.vehicle_id,
      agency_id: agency_id || appointment.agency_id,
      service_id: service_id || appointment.service_id,
      appointment_date: appointment_date || appointment.appointment_date,
      status: status || appointment.status,
      total_price: total_price || appointment.total_price,
      updated_at: new Date()
    });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};