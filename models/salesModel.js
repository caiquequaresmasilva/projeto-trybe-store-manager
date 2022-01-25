const connection = require('./connection');

const createSaleProducts = async (products) => {
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id,quantity) VALUES ?';
  await connection.query(query, [products]);
};

const create = async (products) => {
  const query = 'INSERT INTO StoreManager.sales (id) VALUES (DEFAULT)';
  const [{ insertId: id }] = await connection.execute(query);
  await createSaleProducts(products.map(
    ({ product_id: prodId, quantity }) => [id, prodId, quantity],
  ));
  return { id };
};

module.exports = {
  create,  
};