const express = require('express');

const app = express();
const usersRoute = require('./routes/users');

const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Olá, mundo');
});

app.listen(PORT);

app.use(usersRoute);
app.use(cardsRoute);
