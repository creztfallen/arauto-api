const joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    playerName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

function validateUser(user) {
  const schema = {
    userName: Joi.string().min(5).max(50).required(),
    playerName: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
