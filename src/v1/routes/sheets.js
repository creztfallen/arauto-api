const express = require("express");
const router = express.Router();
const sheetsController = require("../../controllers/sheetsController");

router.get("/", sheetsController.getAllSheets);
router.get("/:sheetId", sheetsController.getOneSheet);
router.post("/", sheetsController.createNewSheet);
router.patch("/:sheetId", sheetsController.updateSheet);

module.exports = router;
