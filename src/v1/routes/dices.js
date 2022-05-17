const express = require("express");
const router = express.Router();
const dicesController = require("../../controllers/dicesController");

router.post("/", dicesController.createNewDice);
router.get("/", dicesController.getAllDices);

module.exports = router;
