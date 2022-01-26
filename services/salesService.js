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
  if (sale.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };
  return sale;
};

const update = async (id, newSale) => {
  const { product_id: productId, quantity } = newSale;
  const sale = await salesModel.checkSale(id);
  if (!sale) return { error: { code: 'notFound', message: 'Sale not found' } };
  await salesModel.update(id, { productId, quantity });
  return {
    saleId: id,
    itemUpdated: [newSale],
  };
};

const del = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };
  await salesModel.del(id);
  return sale;
};

module.exports = {
  create,
  validateSale,
  getAll,
  getById,
  update,
  del,
};