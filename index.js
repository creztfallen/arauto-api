const dotenv = require("dotenv");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const users = require("./routes/users");
const dices = require("./routes/dices");
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
  .then(() => {
    console.log("Now connected to MongoDB!".blue);

    app.use("/users", users);
    app.use("/dices", dices);

    const server = app.listen(PORT, () =>
      console.log(
        `Server is running in ${ENVIRONMENT} mode on port ${PORT}`.cyan
      )
    );
  })
  .catch((err) => console.error("Something went wrong", err));

// Connecting with raw Mongodb -----------------------------------------------
MongoClient.connect(MONGOURL)
  .then((client) => {
    console.log("Successfully connected to the database".blue);
    const db = client.db("arauto");
    const dicesCollection = db.collection("dices");
    const usersCollection = db.collection("users");

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

    // app.get("/dices", (req, res) => {
    //   db.collection("dices")
    //     .find()
    //     .toArray()
    //     .then((result) => {
    //       res.json({ dices: result });
    //     })
    //     .catch((error) => console.error(error));
    // });
  })
  .catch((error) => console.log(error));
