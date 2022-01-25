const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  return { id };
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [[product]] = await connection.execute(query, [name]);
  return product;
};

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

module.exports = {
  create,
  getByName,
  getAll,
};
