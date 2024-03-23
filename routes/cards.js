const router = require('express').Router();

const cardController = require('../controllers/cards');

router.get('/cards', cardController.getCards);

router.delete('/cards/:cardId', cardController.deleteCardsById);

router.post('/cards', cardController.createCard);

router.put('/cards/:cardId/likes', cardController.likeCard);

router.delete('/cards/:cardId/likes', cardController.likeCard);

module.exports = router;
