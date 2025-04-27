// routes/loyalty_program.routes.js
const express = require('express');
const router = express.Router();
const loyaltyProgramController = require('../controllers/loyalty_program.controller');

router.get('/', loyaltyProgramController.getAllLoyaltyPrograms);
router.get('/:id', loyaltyProgramController.getLoyaltyProgramById);
router.post('/', loyaltyProgramController.createLoyaltyProgram);
router.put('/:id', loyaltyProgramController.updateLoyaltyProgram);
router.delete('/:id', loyaltyProgramController.deleteLoyaltyProgram);

module.exports = router;