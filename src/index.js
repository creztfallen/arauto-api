const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");
const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const app = express();

const users = require("./v1/routes/users");
const dices = require("./v1/routes/dices");
const index = require("./v1/routes/index");
const auth = require("./v1/routes/auth");
const sheets = require("./v1/routes/sheets");

//---------------------------------------------------------------------------

const ENVIRONMENT = process.env.ENVIRONMENT;

if (ENVIRONMENT !== "production") {
  dotenv.config({ path: `./config/config.env` });
}

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;
const PrivateKey = process.env.PrivateKey;

app.set("view-engine", "ejs");
app.set("views", `${__dirname}/views`);

//Using body-parser ----------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
//-----------------------------

app.use(express.static(`${__dirname}/public`));

if (!PrivateKey) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Now connected to MongoDB!".blue);

    app.use("/", index);
    app.use("/users", users);
    app.use("/auth", auth);
    app.use("/dices", dices);
    app.use("/sheets", sheets);

    const server = app.listen(PORT, () =>
      console.log(
        `Server is running in ${ENVIRONMENT} mode on port ${PORT}`.cyan
      )
    );
  })
  .catch((err) => console.error("Something went wrong", err));
