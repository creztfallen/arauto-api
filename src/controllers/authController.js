const Joi = require("joi");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");

dotenv.config({ path: "../../config/config.env" });

exports.autenticateUser = async (req, res) => {
  function validate(req) {
    const schema = Joi.object({
      userName: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req.schema);
  }

  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  let user = await User.findOne({ userName: req.body.userName });
  if (!user) {
    return res.status(400).send("Incorrect username or password!");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect username or password!");
  }

  const PrivateKey = process.env.PrivateKey;
  const token = jwt.sign(
    { _id: user._id, userName: user.userName },
    PrivateKey
  );
  res
    .header("x-auth-token", token)
    .send({ ..._.pick(user, ["_id", "userName", "playerName"]), token });
};
