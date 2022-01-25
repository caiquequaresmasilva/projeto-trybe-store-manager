require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/productsRoutes');
const handleErros = require('./middlewares/handleErrors');

const app = express();
app.use(bodyParser);
app.use(handleErros);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
