// controllers/extra.controller.js
const { Extra } = require('../models');

const getAllExtras = async (req, res) => {
  try {
    const extras = await Extra.findAll();
    res.status(200).json(extras);
  } catch (error) {
    console.error('Error fetching extras:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getExtraById = async (req, res) => {
  try {
    const { id } = req.params;
    const extra = await Extra.findByPk(id);
    if (!extra) {
      return res.status(404).json({ message: 'Extra not found' });
    }
    res.status(200).json(extra);
  } catch (error) {
    console.error('Error fetching extra:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createExtra = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const extra = await Extra.create({
      name,
      price,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(extra);
  } catch (error) {
    console.error('Error creating extra:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateExtra = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const extra = await Extra.findByPk(id);
    if (!extra) {
      return res.status(404).json({ message: 'Extra not found' });
    }
    await extra.update({
      name: name || extra.name,
      price: price || extra.price,
      updated_at: new Date()
    });
    res.status(200).json(extra);
  } catch (error) {
    console.error('Error updating extra:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteExtra = async (req, res) => {
  try {
    const { id } = req.params;
    const extra = await Extra.findByPk(id);
    if (!extra) {
      return res.status(404).json({ message: 'Extra not found' });
    }
    await extra.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting extra:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllExtras,
  getExtraById,
  createExtra,
  updateExtra,
  deleteExtra
};