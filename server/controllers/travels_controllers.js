const travels = require("../models").travels;
const pusher = require("../services/pusher_services");

const createTravels = async (req, res) => {
  try {
    const travelsName = ["Ganapathi Travels", "Ganapathi Travels", "Red Bus", "Red Bus", "Fask Book", "Fask Book"];
    const from_city = ["coimbatore", "chennai", "salem", "chennai", "salem", "coimbatore"];
    const to_city = ["chennai", "coimbatore", "chennai", "salem", "coimbatore", "salem"];
    const time = [18, 19, 20, 21, 8, 10];
    const price = [500, 500, 400, 400, 250, 250];
    for (var i = 0; i < travelsName.length; i++) await travels.create({ travels_name: travelsName[i], from_city: from_city[i], to_city: to_city[i], no_of_seats: 20, time: time[i], price: price[i] });
    res.status(201).json({ status: "Travels Created Successfully !!!" });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateTravels = (req, res) => {
  try {
    pusher.trigger("TRAVELS_CHANNEL", "TRAVELS_UPDATE_EVENT", {
      message: "Due to occuations,Travels Detials are Updated."
    });
    res.status(200).json({ status: "Travels Updated Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createTravels,
  updateTravels
};
