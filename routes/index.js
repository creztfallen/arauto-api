const { Dices } = require("../models/dices");
const express = require("express");
const res = require("express/lib/response");
const { connection } = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  Dices.find()
    .then((result) => {
      res.render("index.ejs", { dices: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
