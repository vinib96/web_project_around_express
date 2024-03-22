const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aroundb');

const app = express();
const usersRoute = require('./routes/users');

const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('Olá, mundo');
});

app.use((req, res, next) => {
  req.user = {
    _id: '65fcb7b7ec0b3adc3fbba510',
  };

  next();
});

app.listen(PORT);
app.use(express.json());
app.use(usersRoute);
app.use(cardsRoute);
