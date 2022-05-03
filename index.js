const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const { sendFile } = require("express/lib/response");
const app = express();

//---------------------------------------------------------------------------

const ENVIRONMENT = process.env.ENVIRONMENT;

if (ENVIRONMENT !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

app.set("view-engine", "ejs");

//Using body-parser ----------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//-----------------------------

app.use(express.static("public"));

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Connecting with raw Mongodb -----------------------------------------------
MongoClient.connect(MONGOURL)
  .then((client) => {
    console.log("Successfully connected to the database".blue);
    const db = client.db("arauto");
    const dicesCollection = db.collection("dices");

    app.get("/", (req, res) => {
      db.collection("dices")
        .find()
        .toArray()
        .then((result) => {
          res.render("index.ejs", { dices: result });
          // res.json(result);
        })
        .catch((error) => console.error(error));
    });

    app.get("/dices", (req, res) => {
      db.collection("dices")
        .find()
        .toArray()
        .then((result) => {
          res.json({ dices: result });
          // res.json(result);
        })
        .catch((error) => console.error(error));
    });

    app.post("/dices", (req, res) => {
      const playerName = req.body.playerName;
      const diceType = req.body.diceType;
      const diceValue = randomIntFromInterval(1, diceType);
      dicesCollection
        .insertOne({
          playerName: playerName,
          diceType: diceType,
          diceValue: diceValue,
        })
        .then((result) => {
          res.json({ roll: diceValue });
        })
        .catch((error) => console.error(error));
    });

    // app.put("/quotes", (req, res) => {
    //   quotesCollection
    //     .findOneAndUpdate(
    //       { name: "Yoda" },
    //       {
    //         $set: {
    //           name: req.body.name,
    //           quote: req.body.quote,
    //         },
    //       },
    //       {
    //         upsert: true,
    //       }
    //     )
    //     .then((result) => console.log(result))
    //     .catch((error) => console.error(error));
    // });

    const server = app.listen(PORT, () =>
      console.log(
        `Server is running in ${ENVIRONMENT} mode on port ${PORT}`.cyan
      )
    );
  })
  .catch((error) => console.log(error));

module.exports = app;
