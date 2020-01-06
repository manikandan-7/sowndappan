const users_infos = require("../models").users_info;

const createUserInfo = async payload => {
  try {
    let data = await users_infos.create({
      travels_name: payload.travels_name,
      date: payload.date,
      from_city: payload.from_city,
      to_city: payload.to_city,
      travels_id: payload.travels_id,
      seats: payload.seats,
      passengers_info: payload.passengers_info,
      users_id: payload.users_id
    });
    return data;
  } catch (err) {
    return err;
  }
};
module.exports = { createUserInfo };
