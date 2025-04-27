// routes/agency_admin.routes.js
const express = require('express');
const router = express.Router();
const agencyAdminController = require('../controllers/agency_admin.controller');

router.get('/', agencyAdminController.getAllAgencyAdmins);
router.get('/:id', agencyAdminController.getAgencyAdminById);
router.post('/', agencyAdminController.createAgencyAdmin);
router.put('/:id', agencyAdminController.updateAgencyAdmin);
router.delete('/:id', agencyAdminController.deleteAgencyAdmin);

module.exports = router;