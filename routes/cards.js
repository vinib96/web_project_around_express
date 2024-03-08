const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/cards", (req, res) => {
  const cardPath = path.join(__dirname, "../data/cards.json");
  fs.readFile(cardPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching file");
    }
    const cards = JSON.parse(data);
    res.json(cards);
  });
});

module.exports = router;
