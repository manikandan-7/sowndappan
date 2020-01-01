const { pool } = require("../config/database.config");

const findUser = async input => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [input]);
  return rows[0];
};

const insertUser = async (email, name, googleid, password) => {
  const { rows } = await pool.query("INSERT INTO users(email,name,googleid,password) values($1,$2,$3,$4) RETURNING *", [
    email,
    name,
    googleid,
    password
  ]);
  return rows[0];
};

module.exports = { findUser, insertUser };
