const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/add', clientController.addClient);

router.get('/all', clientController.getAllClients);

module.exports = router;
