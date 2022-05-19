const express = require("express");
const router = express.Router();
const sheetsController = require("../../controllers/sheetsController");

router.get("/", sheetsController.getAllSheets);
router.get("/:sheetId", sheetsController.getOneSheet);
router.post("/", sheetsController.createNewSheet);
router.patch("/:sheetId", sheetsController.updateSheet);
router.delete("/:sheetId", sheetsController.deleteSheet);

module.exports = router;
