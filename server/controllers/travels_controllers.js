const travels = require("../models").travels;

const createTravels = async (req, res) => {
  try {
    const travelsName = ["Ganapathi Travels", "Ganapathi Travels", "Red Bus", "Red Bus", "Fask Book", "Fask Book"];
    const from_city = ["coimbatore", "chennai", "salem", "chennai", "salem", "coimbatore"];
    const to_city = ["chennai", "coimbatore", "chennai", "salem", "coimbatore", "salem"];
    for (var i = 0; i < travelsName.length; i++)
      await travels.create({ travels_name: travelsName[i], from_city: from_city[i], to_city: to_city[i], no_of_seats: 20 });
    res.status(201).json({ status: "Travels Created Successfully !!!" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createTravels
};
