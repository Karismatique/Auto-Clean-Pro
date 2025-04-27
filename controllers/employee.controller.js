// controllers/employee.controller.js
const { Employee } = require('../models');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { agency_id, full_name, email, password, schedule } = req.body;
    if (!agency_id || !full_name || !email || !password) {
      return res.status(400).json({ message: 'Agency ID, full name, email, and password are required' });
    }
    const employee = await Employee.create({
      agency_id,
      full_name,
      email,
      password, // Should be hashed in production
      schedule,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { agency_id, full_name, email, password, schedule } = req.body;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.update({
      agency_id: agency_id || employee.agency_id,
      full_name: full_name || employee.full_name,
      email: email || employee.email,
      password: password || employee.password,
      schedule: schedule || employee.schedule,
      updated_at: new Date()
    });
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};