const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
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
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).required(),
    playerName: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
