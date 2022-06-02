const { Dices, validate } = require("../models/dices");
const { random } = require("../../utils/utils");
const jwt = require("jsonwebtoken");

exports.getAllDices = (req, res) => {
  Dices.find()
    .then((result) => {
      res.json({ dices: result });
    })
    .catch((error) => {
      console.log("ablublublé");
      const status = res.status(400);
      console.log(status.json);
      status.json({ message: error });
    });
};

exports.createNewDice = async (req, res) => {
  const diceType = req.body.diceType;
  const playerName = req.body.playerName;
  const diceValue = random(1, diceType);

  const { error } = validate(req.body);

  try {
    dices = new Dices({
      playerName: playerName,
      diceType: diceType,
      diceValue: diceValue,
    });
    await dices.save();
    res.json({ diceValue: diceValue });
  } catch (err) {
    if (error.details) {
      return res.status(400).json({ message: error.details[0].message });
    }
    return res.status(400).json({ message: err });
  }
};
