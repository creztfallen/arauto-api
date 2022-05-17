const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.post("/", usersController.createNewUser);
router.patch("/", usersController.updateUser);
router.delete("/", usersController.deleteUser);
module.exports = router;
