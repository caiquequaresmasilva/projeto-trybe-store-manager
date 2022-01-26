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

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (sale.error) return next(sale.error);
  res.status(200).json(sale);
};

module.exports = {
  create,
  validateSale,
  getAll,
  getById,
};