const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Campo Obrigatório'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'Campo Obrigatório'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Campo Obrigatório'],
    validate: {
      validator (v) {
        return /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*/gm.test(
          v
        );
      },
      message: (props) => `${props.value} não é válido!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
