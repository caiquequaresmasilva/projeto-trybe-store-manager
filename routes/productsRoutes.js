const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/', rescue(productsController.validateProducts), rescue(productsController.create));

module.exports = router;