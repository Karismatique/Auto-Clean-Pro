// routes/appointment_extras.routes.js
const express = require('express');
const router = express.Router();
const appointmentExtrasController = require('../controllers/appointment_extras.controller');

router.get('/', appointmentExtrasController.getAllAppointmentExtras);
router.post('/', appointmentExtrasController.createAppointmentExtra);
router.delete('/', appointmentExtrasController.deleteAppointmentExtra); // Uses query params: ?appointment_id=1&extra_id=1

module.exports = router;