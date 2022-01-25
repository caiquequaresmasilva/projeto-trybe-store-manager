const productsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  const product = await productsModel.getByName(name);
  if (product) return { error: { code: 'alreadyExists', message: 'Product already exists' } };

  const { id } = await productsModel.create({ name, quantity });
  return { id, name, quantity };
};

module.exports = {
  create,
};