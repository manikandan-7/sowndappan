const jwt = require("jsonwebtoken");

const jwtSign = async (payload, key) => {
  let data = await jwt.sign(payload, key);
  return data;
};

module.exports = { jwtSign };
