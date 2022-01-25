const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', rescue(productsController.getAll));
router.get('/:id', rescue(productsController.getById));
router.put('/:id');
router.post('/', rescue(productsController.validateProducts), rescue(productsController.create));

module.exports = router;