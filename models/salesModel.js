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

const getAll = async () => {
  const query = `SELECT sale_id, product_id, quantity, date 
  FROM StoreManager.sales_products AS sp JOIN StoreManager.sales AS s 
  ON sp.sale_id = s.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `SELECT product_id, quantity, date 
  FROM StoreManager.sales_products AS sp JOIN StoreManager.sales AS s 
  ON sp.sale_id = s.id WHERE sale_id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,  
};