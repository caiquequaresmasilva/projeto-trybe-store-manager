const salesModel = require('../models/salesModel');

const create = async (products) => {
  const { id } = await salesModel.create(products);
  return { id, itemsSold: products };
};

module.exports = {
  create,
};