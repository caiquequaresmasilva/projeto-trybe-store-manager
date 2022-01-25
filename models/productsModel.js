const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  return { id };
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [[product]] = connection.execute(query, [name]);
  return product;
};

module.exports = {
  create,
  getByName,
};
