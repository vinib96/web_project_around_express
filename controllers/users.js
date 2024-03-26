const User = require('../models/user');

const ERROR_NOT_FOUND = 404;
const ERROR_FETCH = 500;
const ERROR_INVALID_DATA = 400;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (users) {
        res.send({ data: users });
      } else {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'ID do usuário não encontrado' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_INVALID_DATA).send({ message: 'Dados inválidos' });
      } else {
        res.status(ERROR_FETCH).send({ message: 'Error' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INVALID_DATA).send({ message: 'Dados inválidos' });
      } else {
        res.status(ERROR_FETCH).send({ message: 'Error' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }).then((users) =>
    res.send({ data: users }).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INVALID_DATA).send({ message: 'Dados inválidos' });
      } else {
        res.status(ERROR_FETCH).send({ message: 'Error' });
      }
    })
  );
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }).then((users) =>
    res.send({ data: users }).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INVALID_DATA).send({ message: 'Dados inválidos' });
      } else {
        res.status(ERROR_FETCH).send({ message: 'Error' });
      }
    })
  );
};
