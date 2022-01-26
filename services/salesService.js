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

const serialize = (sales) => sales.map((sale) => {
  const { sale_id: saleId, ...rest } = sale;
  return { saleId, ...rest };
});

const create = async (products) => {
  const { id } = await salesModel.create(products);
  return { id, itemsSold: products };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return serialize(sales);
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) return { error: { code: 'notFound', message: 'Sale not found' } };
  return sale;
};

module.exports = {
  create,
  validateSale,
  getAll,
};