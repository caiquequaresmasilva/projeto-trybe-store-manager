const salesService = require('../services/salesService');

const validateSale = (req, _res, next) => {
  const products = req.body;
  const validation = salesService.validateSale(products);
  if (validation.error) return next(validation.error);
  next();
};

const create = async (req, res) => {
  const products = req.body;
  const sale = await salesService.create(products);
  res.status(201).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
};

module.exports = {
  create,
  validateSale,
  getAll,
};