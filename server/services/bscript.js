const bcryptjs = require("bcryptjs");

const encript = async input => {
  let salt = await bcryptjs.genSalt(10);
  let hash = await bcryptjs.hash(input, salt);
  return hash;
};

const bscriptCompare = async (compareTo, compareWith) => {
  let data = await bcryptjs.compare(compareTo, compareWith);
  console.log(data);
  return data;
};

module.exports = { encript, bscriptCompare };
