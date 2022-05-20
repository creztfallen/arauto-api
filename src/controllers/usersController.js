const { User, validate } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!jwt.verify(token, process.env.PrivateKey)) {
      throw new Error();
    }

    const decoded = jwt.decode(token);
    console.log(decoded);

    user = await User.findOneAndUpdate(
      { _id: req.params.userId, userName: decoded.userName },
      {
        playerName: req.body.playerName,
      }
    );
    res.send(user);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.deleteUser = async (req, res) => {
  let user;

  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!jwt.verify(token, process.env.PrivateKey)) {
      throw new Error();
    }

    const decoded = jwt.decode(token);

    user = await User.findOneAndDelete({
      _id: req.params.userId,
      userName: decoded.userName,
    });
    res.status(200).send("User deleted.");
  } catch (error) {
    return res.status(400).send({ error });
  }
};
