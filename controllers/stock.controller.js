// controllers/stock.controller.js
const { Stock } = require('../models');

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.status(200).json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createStock = async (req, res) => {
  try {
    const { agency_id, product_name, quantity } = req.body;
    if (!agency_id || !product_name) {
      return res.status(400).json({ message: 'Agency ID and product name are required' });
    }
    const stock = await Stock.create({
      agency_id,
      product_name,
      quantity: quantity || 0,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(stock);
  } catch (error) {
    console.error('Error creating stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { agency_id, product_name, quantity } = req.body;
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    await stock.update({
      agency_id: agency_id || stock.agency_id,
      product_name: product_name || stock.product_name,
      quantity: quantity !== undefined ? quantity : stock.quantity,
      updated_at: new Date()
    });
    res.status(200).json(stock);
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    await stock.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting stock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
};