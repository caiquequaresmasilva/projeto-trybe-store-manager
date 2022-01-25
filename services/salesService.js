const salesModel = require('../models/salesModel');
const saleSchema = require('../schemas/saleSchema');

const validateSale = (products) => {
  for (let i = 0; i < products.length; i += 1) {
    const aux = { 
      productId: products[i].product_id,
       quantity: products[i].quantity, 
    };
    const validation = saleSchema.validate(aux);
    if (validation.error) return validation;
  }
  return {};
};

const create = async (products) => {
  const { id } = await salesModel.create(products);
  return { id, itemsSold: products };
};

module.exports = {
  create,
  validateSale,
};