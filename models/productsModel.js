const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  return { id };
};

module.exports = {
  create,
};
