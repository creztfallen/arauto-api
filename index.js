const dotenv = require("dotenv");
const mongoose = require("mongoose");
const users = require("./routes/users");
const dices = require("./routes/dices");
const index = require("./routes/index");
const auth = require("./routes/auth");
const colors = require("colors");
const bodyParser = require("body-parser");
const cors = require("cors");
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
const PrivateKey = process.env.PrivateKey;

app.set("view-engine", "ejs");

//Using body-parser ----------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
//-----------------------------

app.use(express.static("public"));

if (!PrivateKey) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Now connected to MongoDB!".blue);

    app.use("/users", users);
    app.use("/dices", dices);
    app.use("/auth", auth);
    app.use("/", index);

    const server = app.listen(PORT, () =>
      console.log(
        `Server is running in ${ENVIRONMENT} mode on port ${PORT}`.cyan
      )
    );
  })
  .catch((err) => console.error("Something went wrong", err));
