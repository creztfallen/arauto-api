const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.post("/", usersController.createNewUser);
router.patch("/:userId", usersController.updateUser);
router.delete("/:userId", usersController.deleteUser);
module.exports = router;
