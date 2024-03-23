const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (users) {
        res.send({ data: users });
      } else {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Dados inválidos' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }).then((users) =>
    res.send({ data: users }).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    })
  );
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }).then((users) =>
    res.send({ data: users }).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Dados inválidos' });
      } else {
        res.status(500).send({ message: 'Error' });
      }
    })
  );
};
