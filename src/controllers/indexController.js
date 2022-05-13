const { Dices } = require("../models/dices");

exports.getMainPage = (req, res) => {
  Dices.find()
    .then((result) => {
      res.render("index.ejs", { dices: result });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
