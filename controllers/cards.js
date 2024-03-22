const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.deleteCardsById = (req, res) => {
  Card.findById(req.params._id)
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })

    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err }));
};
