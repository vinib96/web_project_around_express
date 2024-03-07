const router = require("express").Router();
const { cards } = require("../data");

router.get(cards, (req, res) => {
  res.send(cards);
});
