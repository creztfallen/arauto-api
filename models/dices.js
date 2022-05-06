const Joi = require("joi");
const mongoose = require("mongoose");

const Dices = mongoose.model(
  "dices",
  new mongoose.Schema({
    playerName: {
      type: String,
      required: false,
      maxlength: 15,
    },
    diceType: {
      type: Number,
      required: false,
      maxlength: 1024,
    },
    diceValue: {
      type: Number,
      required: false,
      maxlength: 1024,
    },
  })
);

function validateDices(dices) {
  const schema = Joi.object({
    playerName: Joi.string().max(15),
    diceType: Joi.number().max(1024),
    diceValue: Joi.number().max(1024),
  });
  return schema.validate(dices);
}

exports.Dices = Dices;
exports.validate = validateDices;
