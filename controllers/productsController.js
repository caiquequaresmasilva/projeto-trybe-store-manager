const productsService = require('../services/productsService');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsService.create({ name, quantity });

  if (product.error) next(product.error);
  
  res.status(201).json(product);
};
module.exports = {
  create,
};