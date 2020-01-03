const users = require("../models").users;
const dates = require("../models").dates;
const travels = require("../models").travels;
const users_infos = require("../models").users_info;
let { getTravelsFromElasticSearch } = require("./service.controller");

const usersTicketInfo = async (req, res) => {
  try {
    let { id } = req.user,
      data = [];
    let users_info = await users_infos.findAll({ where: { users_id: id } });
    users_info.forEach(i => data.push(i.dataValues));
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const cancelTicket = async (req, res) => {
  try {
    let { id, ticket } = req.body,
      newSeats,
      data = [];
    let bookedSeat = ticket.seats;
    await users_infos.destroy({ where: { id: id } });
    let { dataValues } = await dates.findOne({ where: { travels_id: ticket.travels_id, date: ticket.date } });
    newSeats = dataValues.seats;
    let dates_id = dataValues.id;
    for (var i = 0; i < bookedSeat.length; i++) newSeats[bookedSeat[i]] = "0";
    await dates.update({ seats: newSeats }, { where: { id: dates_id } });
    let users_info = await users_infos.findAll({ where: { users_id: req.user.id } });
    users_info.forEach(i => data.push(i.dataValues));
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const filterTravels = async (req, res) => {
  try {
    let { from_city, to_city } = req.body;
    let data = await getTravelsFromElasticSearch();
    let val = data.find(i => i._source.from_city === from_city && i._source.to_city === to_city);
    let { _id, _source } = val;
    let newRow = { id: parseInt(_id), ..._source };
    res.status(200).json([newRow]);
  } catch (err) {
    res.status(400).json(err);
  }
};

const bookTravels = async (req, res) => {
  try {
    let { newBooking, selectedDate } = req.body,
      data = [];
    if (!newBooking || !selectedDate) return res.status(400).json("Unknown error");
    let { travels_id, travels_name, date, from_city, to_city, seats, passengers_info } = newBooking,
      p_info = "[";
    for (var i = 0; i < passengers_info.length; i++)
      p_info += `{"name":"${passengers_info[i].name}","gender":"${passengers_info[i].gender}","ph":"${passengers_info[i].ph}"}`;
    p_info += "]";
    await users_infos.create({
      travels_name: travels_name,
      date: date,
      from_city: from_city,
      to_city: to_city,
      travels_id: travels_id,
      seats: seats,
      passengers_info: passengers_info,
      users_id: req.user.id
    });
    let datesData = await dates.findOne({ where: { travels_id: travels_id, date: date } });
    if (datesData) {
      let dates_id = datesData.dataValues.id;
      console.log(dates_id);
      await dates.update({ seats: selectedDate.seats }, { where: { id: dates_id } });
    } else await dates.create({ date: selectedDate.date, seats: selectedDate.seats, travels_id: travels_id });
    let users_info = await users_infos.findAll({ where: { users_id: req.user.id } });
    users_info.forEach(i => data.push(i.dataValues));
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTravelsById = async (req, res) => {
  try {
    let { id } = req.body,
      data = [];
    let { dataValues } = await travels.findOne({ where: { id: id } });
    let travel_data = await dates.findAll({ where: { travels_id: id } });
    travel_data.forEach(i => data.push(i.dataValues));
    let newTravels = {
      ...dataValues,
      dates: data
    };
    res.status(200).json(newTravels);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { usersTicketInfo, cancelTicket, filterTravels, bookTravels, getTravelsById };
