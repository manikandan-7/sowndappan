const { pool } = require("../config/database.config");
const { jwtVal } = require("../config/keys.config");
const jwt = require("jsonwebtoken");
const { findUser, insertUser } = require("../model/index").user;
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password, googleid, name } = req.body;
    let user = await findUser(email);
    if (!googleid) googleid = "";
    else password = "";
    if (user) return res.status(400).json({ result: "User already exists" });
    let salt = await bcryptjs.genSalt(10);
    let hash = await bcryptjs.hash(password, salt);
    password = hash;
    user = await insertUser(email, name, googleid, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ status: "failed", err: error });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password } = req.body;
    let user = await findUser(email);
    if (!user) res.status(404).json("User Does not Exists");
    let isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) res.status(404).json({ result: "Password does not match " });
    let token = await jwt.sign({ email: user.email }, jwtVal.secretKey);
    res.status(200).json({ success: true, token: "Bearer " + token });
  } catch (error) {
    res.status(400).json({ status: "failed", err: error });
  }
};

const userInfo = (req, res) => {
  console.log("entering");
  res.json(req.user);
};

module.exports = { register, login, userInfo, insertUser };

// const insertUser = async (req, res) => {
//   try {
//     let { email, password, googleid } = req.body;
//     let query = `INSERT INTO users(email,name,password) values($1,$2)`;
//     await pool.query(query, ["hia", "hello"]);
//     res.json({ status: "success" });
//   } catch (err) {
//     res.json({ status: err });
//   }
// };

// const getAllUser = async (req, res) => {
//   try {
//     const readAllQuery = "SELECT * FROM users";
//     const { rows } = await pool.query(readAllQuery);
//     return res.send({ rows });
//   } catch (error) {
//     return res.send(error);
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { nickname } = req.body;
//     const query = "DELETE FROM users WHERE nickname=($1)";
//     await pool.query(query, [nickname]);
//     res.json({ status: "Success" });
//   } catch (err) {
//     res.json({ status: err });
//   }
// };

// const createUserEntry = async (req, res) => {
//   try {
//     let { date, seat, user_id } = req.body;
//     const query = "INSERT INTO entries(user_id,date,seat) values($1,$2,$3)";
//     await pool.query(query, [user_id, date, seat]);
//     res.json({ status: "Success" });
//   } catch (err) {
//     res.json({ status: err });
//   }
// };

// const getAllUserEntries = async (req, res) => {
//   try {
//     const readAllQuery = "SELECT * FROM entries";
//     const { rows } = await pool.query(readAllQuery);
//     return res.send({ rows });
//   } catch (error) {
//     return res.send(error);
//   }
// };

// const allDetails = async (req, res) => {
//   try {
//     const query = "select * from users FULL OUTER JOIN entries ON entries.user_id = users.id";
//     let { rows } = await pool.query(query);
//     res.json({ rows });
//   } catch (err) {
//     return res.send(error);
//   }
// };

// module.exports = {getAllUser, insertUser, deleteUser, createUserEntry, getAllUserEntries, allDetails
