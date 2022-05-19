const { Sheets, validate } = require("../models/sheets");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

exports.getAllSheets = (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  // Verificando se o token é válido.
  if (!jwt.verify(token, process.env.PrivateKey)) {
    throw new Error();
  }

  // Destrinchando token
  const decoded = jwt.decode(token);
  console.log(decoded);

  Sheets.find({ playerId: decoded._id })
    .then(async (result) => {
      res.status(200).json({
        sheets: result,
      });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.getOneSheet = (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  // Verificando se o token é válido.
  if (!jwt.verify(token, process.env.PrivateKey)) {
    throw new Error();
  }

  // Destrinchando token
  const decoded = jwt.decode(token);
  console.log(decoded);

  sheets = Sheets.findOne({ _id: req.params.sheetId })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.send(400).json({ message: error }));
};

exports.createNewSheet = async (req, res) => {
  const body = req.body;

  const token = req.headers.authorization.replace("Bearer ", "");

  // Verificando se o token é válido.
  if (!jwt.verify(token, process.env.PrivateKey)) {
    throw new Error();
  }

  // Destrinchando token
  const decoded = jwt.decode(token);
  console.log(decoded);

  const playerId = decoded._id;
  const playerName = body.playerName;
  const playerClass = body.playerClass;
  const race = body.race;
  const equipments = body.equipments;
  const atributes = body.atributes;

  const { error } = validate({ ...req.body, playerId: playerId });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    sheets = new Sheets({
      playerId: playerId,
      playerName: playerName,
      playerClass: playerClass,
      race: race,
      equipments: equipments,
      atributes: atributes,
    });
    await sheets.save();
    res.status(200).json({ sheets });
  } catch {
    return res.status(400).send({ message: error.details[0].message });
  }
};

exports.updateSheet = async (req, res) => {
  let sheets;

  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!jwt.verify(token, process.env.PrivateKey)) {
      throw new Error();
    }

    const decoded = jwt.decode(token);
    console.log(decoded);

    sheets = await Sheets.findOneAndUpdate(
      { _id: req.params.sheetId, playerId: decoded._id },
      {
        playerName: req.body.playerName,
        playerClass: req.body.playerClass,
        race: req.body.race,
        equipments: req.body.equipments,
        atributes: req.body.atributes,
      }
    );
    res.status(200).json(sheets);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.deleteSheet = async (req, res) => {
  let sheets;

  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (!jwt.verify(token, process.env.PrivateKey)) {
      throw new Error();
    }

    const decoded = jwt.decode(token);

    sheets = await Sheets.findOneAndDelete({
      _id: req.params.sheetId,
      playerId: decoded._id,
    });
    res.status(200).send("Sheet deleted!");
  } catch (error) {
    return res.status(400).send({ error });
  }
};
