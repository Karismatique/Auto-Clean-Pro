// controllers/loyalty_program.controller.js
const { LoyaltyProgram } = require('../models');

const getAllLoyaltyPrograms = async (req, res) => {
  try {
    const loyaltyPrograms = await LoyaltyProgram.findAll();
    res.status(200).json(loyaltyPrograms);
  } catch (error) {
    console.error('Error fetching loyalty programs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getLoyaltyProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const loyaltyProgram = await LoyaltyProgram.findByPk(id);
    if (!loyaltyProgram) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    res.status(200).json(loyaltyProgram);
  } catch (error) {
    console.error('Error fetching loyalty program:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createLoyaltyProgram = async (req, res) => {
  try {
    const { user_id, points, rewards } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const loyaltyProgram = await LoyaltyProgram.create({
      user_id,
      points: points || 0,
      rewards,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(loyaltyProgram);
  } catch (error) {
    console.error('Error creating loyalty program:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLoyaltyProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, points, rewards } = req.body;
    const loyaltyProgram = await LoyaltyProgram.findByPk(id);
    if (!loyaltyProgram) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    await loyaltyProgram.update({
      user_id: user_id || loyaltyProgram.user_id,
      points: points !== undefined ? points : loyaltyProgram.points,
      rewards: rewards || loyaltyProgram.rewards,
      updated_at: new Date()
    });
    res.status(200).json(loyaltyProgram);
  } catch (error) {
    console.error('Error updating loyalty program:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteLoyaltyProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const loyaltyProgram = await LoyaltyProgram.findByPk(id);
    if (!loyaltyProgram) {
      return res.status(404).json({ message: 'Loyalty program not found' });
    }
    await loyaltyProgram.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting loyalty program:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllLoyaltyPrograms,
  getLoyaltyProgramById,
  createLoyaltyProgram,
  updateLoyaltyProgram,
  deleteLoyaltyProgram
};