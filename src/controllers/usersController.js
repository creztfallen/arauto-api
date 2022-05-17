const { User, validate } = require("../models/users");
const bcrypt = require("bcrypt");

exports.createNewUser = async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exists
  let user = await User.findOne({ userName: req.body.userName });

  try {
    user = new User({
      userName: req.body.userName,
      playerName: req.body.playerName,
      password: req.body.password,
    });
    await user.save();
  } catch {
    return res.status(400).send("That user already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
};

exports.updateUser = async (req, res) => {
  let user;
  try {
    user = await User.findOneAndUpdate(
      { userName: req.body.userName },
      {
        playerName: req.body.userName,
        password: req.body.password,
      }
    );
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).send("Couldn't update that user");
  }
  res.send(user);
};

exports.deleteUser = async (req, res) => {
  let user;
  try {
    user = await User.findOneAndDelete({ userName: req.body.userName });
    await user.save();
  } catch {
    return res.status(400).send("Couldn't delete that user");
  }
  res.status(200).send("Nice.");
};
