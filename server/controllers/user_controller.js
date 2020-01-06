const users = require("../models").users;
const { encript, bscriptCompare } = require("../services/bscript_service");
const { jwtSign } = require("../services/jwt_services");
const { jwtVal } = require("../config/keys.config");

const register = async (req, res) => {
  try {
    let { email, password, googleid, name } = req.body;
    let user = await users.findOne({ where: { email: email } });
    if (!googleid) googleid = "";
    else password = "";
    if (user) return res.status(400).json({ email: "User already exists" });
    password = await encript(password);
    let data = await users.create({ email: email, name: name, googleid: googleid, password: password });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ err: "Some Error Occured. Please try again later" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let { dataValues } = await users.findOne({ where: { email: email } });
    if (!dataValues) return res.status(404).json("User Does not Exists");
    let isMatch = await bscriptCompare(password, dataValues.password);
    if (!isMatch) return res.status(404).json({ result: "Password does not match " });
    let token = await jwtSign({ email: dataValues.email }, jwtVal.secretKey);
    res.status(200).json({ success: true, token: "Bearer " + token });
  } catch (error) {
    res.status(400).json({ status: "failed", err: error });
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
