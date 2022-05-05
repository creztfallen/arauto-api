const { User, validate } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ userName: req.body.userName });
  if (user) {
    return res.status(400).send("That user already exists!");
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      userName: req.body.userName,
      playerName: req.body.playerName,
      password: req.body.password,
    });
    await user.save();
    res.send(user);
  }
});

module.exports = router;
