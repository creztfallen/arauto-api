const { Dices, validate } = require("../models/dices");
const { random } = require("../../utils");

exports.getAllDices = (req, res) => {
  Dices.find()
    .then((result) => {
      res.json({ dices: result });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.createNewDice = async (req, res) => {
  const diceType = req.body.diceType;
  const diceValue = random(1, diceType);

  const { error } = validate(req.body);

  try {
    dices = new Dices({
      playerName: req.body.playerName,
      diceType: req.body.diceType,
      diceValue: diceValue,
    });
    await dices.save();
    res.json({ diceValue: diceValue });
  } catch {
    return res.status(400).send({ message: error.details[0].message });
  }
};
