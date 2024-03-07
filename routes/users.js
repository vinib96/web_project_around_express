const router = require("express").Router();
const { users } = require("../data");

router.get(users, (req, res) => {
  res.send(users);
});
