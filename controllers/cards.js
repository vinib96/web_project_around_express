const Card = require('../models/card');

const ERROR_NOT_FOUND = 404;
const ERROR_FETCH = 500;
const ERROR_INVALID_DATA = 400;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));
};

module.exports.deleteCardsById = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('Nenhum cartão encontrado com esse id');
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    })
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_FETCH).send({ message: 'Error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })

    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_INVALID_DATA).send({ message: 'Dados inválidos' });
      } else {
        res.status(ERROR_FETCH).send({ message: 'Error' });
      }
    });
};

module.exports.likeCard = (req) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

module.exports.dislikeCard = (req) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
