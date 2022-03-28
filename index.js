require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const handleErros = require('./middlewares/handleErrors');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send('ok');
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(handleErros);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
