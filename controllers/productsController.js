const productsService = require('../services/productsService');

const validateProducts = (req, _res, next) => {
  const { name, quantity } = req.body;
  const validation = productsService.validateProducts({ name, quantity });
  if (validation.error) return next(validation.error);
  next();
};

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsService.create({ name, quantity });

  if (product.error) return next(product.error);
  
  res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.error) return next(product.error);
  res.status(200).json(product);
};

module.exports = {
  create,
  validateProducts,
  getAll,
  getById,
};