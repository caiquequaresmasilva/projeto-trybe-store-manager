const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', rescue(salesController.validateSale), rescue(salesController.create));
router.get('/', rescue(salesController.getAll));

module.exports = router;