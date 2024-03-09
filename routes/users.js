const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  const userPath = path.join(__dirname, '../data/users.json');
  fs.readFile(userPath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching file');
    }
    const user = JSON.parse(data);
    res.json(user);
  });
});

router.get('/users/:id', (req, res) => {
  const userPath = path.join(__dirname, '../data/users.json');
  fs.readFile(userPath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching file');
    }
    const userId = JSON.parse(data);
    const selectUser = userId.find((user) => user._id === req.params.id);
    if (!selectUser) {
      res.status(404).json({ message: 'ID do usuário não encontrado' });
    } else {
      res.json(selectUser);
    }
  });
});

module.exports = router;
