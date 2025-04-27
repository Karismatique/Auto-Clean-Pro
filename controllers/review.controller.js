// controllers/review.controller.js
const { Review } = require('../models');

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createReview = async (req, res) => {
  try {
    const { user_id, appointment_id, rating, comment, photos } = req.body;
    if (!user_id || !appointment_id || !rating) {
      return res.status(400).json({ message: 'User ID, appointment ID, and rating are required' });
    }
    const review = await Review.create({
      user_id,
      appointment_id,
      rating,
      comment,
      photos: photos ? JSON.stringify(photos) : null,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, appointment_id, rating, comment, photos } = req.body;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.update({
      user_id: user_id || review.user_id,
      appointment_id: appointment_id || review.appointment_id,
      rating: rating || review.rating,
      comment: comment || review.comment,
      photos: photos ? JSON.stringify(photos) : review.photos,
      updated_at: new Date()
    });
    res.status(200).json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};