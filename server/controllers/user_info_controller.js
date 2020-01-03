const users_infos = require("../models").users_info;

const createUserInfo = async (req, res) => {
  try {
    let data = await users_infos.create({
      travels_name: "FastBook",
      date: "4/1/2020",
      from_city: "coimbatore",
      to_city: "salem",
      travels_id: 6,
      seats: [1, 2, 3],
      passengers_info: [{ name: "jai", gender: "male", ph: "sdvberuv" }],
      users_id: 6
    });
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports = { createUserInfo };
