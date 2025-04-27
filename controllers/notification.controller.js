// controllers/notification.controller.js
const { Notification } = require('../models');

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createNotification = async (req, res) => {
  try {
    const { user_id, appointment_id, type, message, sent_at } = req.body;
    if (!user_id || !appointment_id || !type || !message) {
      return res.status(400).json({ message: 'User ID, appointment ID, type, and message are required' });
    }
    const notification = await Notification.create({
      user_id,
      appointment_id,
      type,
      message,
      sent_at,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, appointment_id, type, message, sent_at } = req.body;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.update({
      user_id: user_id || notification.user_id,
      appointment_id: appointment_id || notification.appointment_id,
      type: type || notification.type,
      message: message || notification.message,
      sent_at: sent_at || notification.sent_at,
      updated_at: new Date()
    });
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
};