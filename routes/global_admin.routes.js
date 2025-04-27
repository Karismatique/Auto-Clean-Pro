// routes/global_admin.routes.js
const express = require('express');
const router = express.Router();
const globalAdminController = require('../controllers/global_admin.controller');

router.get('/', globalAdminController.getAllGlobalAdmins);
router.get('/:id', globalAdminController.getGlobalAdminById);
router.post('/', globalAdminController.createGlobalAdmin);
router.put('/:id', globalAdminController.updateGlobalAdmin);
router.delete('/:id', globalAdminController.deleteGlobalAdmin);

module.exports = router;