const Joi = require("joi");
const mongoose = require("mongoose");

const Sheets = mongoose.model(
  "sheets",
  new mongoose.Schema({
    playerId: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    playerName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    playerClass: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    race: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    equipments: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
    atributes: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
  })
);

function validateSheets(user) {
  const schema = Joi.object({
    playerId: Joi.string().min(5).max(200).required(),
    playerName: Joi.string().min(3).max(100).required(),
    playerClass: Joi.string().min(5).max(50).required(),
    race: Joi.string().min(5).max(50).required(),
    equipments: Joi.string().min(5).max(500).required(),
    atributes: Joi.string().min(5).max(500).required(),
  });
  return schema.validate(user);
}

exports.Sheets = Sheets;
exports.validate = validateSheets;
