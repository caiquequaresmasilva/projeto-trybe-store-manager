const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?,?)';
  const [{ insertId: id }] = await connection.execute(query, [name, quantity]);
  return { id };
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [[product]] = await connection.execute(query, [name]);
  return product;
};  

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const update = async (id, { name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
};

const del = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

const updateProductsQty = async (products, sign) => {
  const query = `UPDATE products SET quantity = quantity ${sign} ? WHERE id = ?`;
  await Promise.all(products.map(
    ({ product_id: id, quantity }) => connection.execute(query, [quantity, id]),
));
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  del,
  updateProductsQty,
};
