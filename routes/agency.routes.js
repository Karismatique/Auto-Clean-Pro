// routes/agency.routes.js
const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agency.controller');

router.get('/', agencyController.getAllAgencies);
router.get('/:id', agencyController.getAgencyById);
router.post('/', agencyController.createAgency);
router.put('/:id', agencyController.updateAgency);
router.delete('/:id', agencyController.deleteAgency);

module.exports = router;