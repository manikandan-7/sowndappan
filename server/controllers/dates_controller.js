const dates = require("../models").dates;

const createDates = async (req, res) => {
  try {
    let seats = ["male", "male", "male", "male", "male", "female", "female", "female", "female", "female", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    let date = ["8/1/2020", "9/1/2020"];
    for (var i = 1; i <= 6; i++) for (var j = 0; j <= 1; j++) await dates.create({ date: date[j], seats: seats, travels_id: i });
    res.status(201).json({ status: "Dates inserted Successfully !!!" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createDates
};
