const dotenv = require("dotenv");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const users = require("./routes/users");
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

mongoose
  .connect(MONGOURL)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

//Connecting with raw Mongodb -----------------------------------------------
// MongoClient.connect(MONGOURL)
//   .then((client) => {
//     console.log("Successfully connected to the database".blue);
//     const db = client.db("arauto");
//     const dicesCollection = db.collection("dices");
//     const usersCollection = db.collection("users");

//     app.get("/", (req, res) => {
//       db.collection("dices")
//         .find()
//         .toArray()
//         .then((result) => {
//           res.render("index.ejs", { dices: result });
//           // res.json(result);
//         })
//         .catch((error) => console.error(error));
//     });

//     app.get("/dices", (req, res) => {
//       db.collection("dices")
//         .find()
//         .toArray()
//         .then((result) => {
//           res.json({ dices: result });
//         })
//         .catch((error) => console.error(error));
//     });

//     app.post("/dices", (req, res) => {
//       const playerName = req.body.playerName;
//       const diceType = req.body.diceType;
//       const diceValue = randomIntFromInterval(1, diceType);
//       dicesCollection
//         .insertOne({
//           playerName: playerName,
//           diceType: diceType,
//           diceValue: diceValue,
//         })
//         .then((result) => {
//           res.json({ roll: diceValue });
//         })
//         .catch((error) => console.error(error));
//     });

//     app.post("/users", (req, res) => {
//       const userName = req.body.userName;
//       const playerName = req.body.playerName;
//       const password = req.body.password;
//       usersCollection
//         .insertOne({
//           userName: userName,
//           playerName: playerName,
//           password: password,
//         })
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((error) => console.log(error));
//     });

//     // app.put("/quotes", (req, res) => {
//     //   quotesCollection
//     //     .findOneAndUpdate(
//     //       { name: "Yoda" },
//     //       {
//     //         $set: {
//     //           name: req.body.name,
//     //           quote: req.body.quote,
//     //         },
//     //       },
//     //       {
//     //         upsert: true,
//     //       }
//     //     )
//     //     .then((result) => console.log(result))
//     //     .catch((error) => console.error(error));
//     // });

//     const server = app.listen(PORT, () =>
//       console.log(
//         `Server is running in ${ENVIRONMENT} mode on port ${PORT}`.cyan
//       )
//     );
//   })
//   .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/users", users);

const server = app.listen(PORT, () =>
  console.log(`Server is running in ${ENVIRONMENT} mode on port ${PORT}`.cyan)
);
