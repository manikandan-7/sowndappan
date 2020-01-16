const users = require("../models").users;
const { encript, bscriptCompare } = require("../services/bscript_service");
const { jwtSign } = require("../services/jwt_services");
const { jwtVal } = require("../config/keys.config");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const register = async (req, res) => {
  try {
    let { email, password, googleid, name } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if (!googleid) {
      googleid = "";
      let { err, isValid } = await validateRegisterInput(req.body);
      if (!isValid) return res.status(412).json(err);
    } else password = "";
    if (user) return res.status(409).json({ email: "User already exists" });
    password = await encript(password);
    let data = await users.create({ email: email, name: name, googleid: googleid, password: password });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: "Some Error Occured. Please try again later" });
  }
};

const login = async (req, res) => {
  try {
    let { err, isValid } = validateLoginInput(req.body);
    if (!isValid) return res.status(412).json(err);
    let { email, password } = req.body;
    let { dataValues } = await users.findOne({ where: { email: email } });
    if (!dataValues) return res.status(409).json("User Does not Exists");
    let isMatch = await bscriptCompare(password, dataValues.password);
    if (!isMatch) return res.status(412).json({ err: "Password does not match " });
    let token = await jwtSign({ email: dataValues.email }, jwtVal.secretKey);
    res.status(200).json({ success: true, token: "Bearer " + token });
  } catch (error) {
    res.status(400).json({ err: "User does not exists" });
  }
};

const userInfo = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  register,
  login,
  userInfo
};
