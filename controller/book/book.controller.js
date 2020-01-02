let { pool } = require("../../config/database.config");
let { findUser } = require("../../model/user.model");
// let { searchData } = require("../../service/elasticsearch.service");
let { getTravelsFromElasticSearch } = require("./service.controller");
const usersTicketInfo = async (req, res) => {
  try {
    let { email } = req.user;
    let user = await findUser(email);
    let { id } = user;
    let { rows } = await pool.query("select * from users_info where users_id = $1", [id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

const cancelTicket = async (req, res) => {
  try {
    let { id, ticket } = req.body,
      newSeats;
    let bookedSeat = ticket.seats;
    await pool.query("delete from users_info where id = $1", [id]);
    let { rows } = await pool.query("select * from dates where travels_id = $1 and date = $2 ;", [ticket.travels_id, ticket.date]);
    newSeats = rows[0].seats;
    let dates_id = rows[0].id;
    for (var i = 0; i < bookedSeat.length; i++) newSeats[bookedSeat[i]] = "0";
    await pool.query("update dates set seats = $1 where id = $2", [newSeats, dates_id]);
    let { email } = req.user;
    let user = await findUser(email);
    let data = await pool.query("select * from users_info where users_id = $1", [user.id]);
    res.status(200).json(data.rows);
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
    let { newBooking, selectedDate } = req.body;
    if (!newBooking || !selectedDate) return res.status(400).json("Unknown error");
    let { travels_id, travels_name, date, from_city, to_city, seats, passengers_info } = newBooking;
    let { id } = req.user;
    let p_info = "[";
    for (var i = 0; i < passengers_info.length; i++) {
      p_info += `{"name":"${passengers_info[i].name}","gender":"${passengers_info[i].gender}","ph":"${passengers_info[i].ph}"}`;
    }
    p_info += "]";
    await pool.query(
      `insert into users_info(users_id,travels_name,date,from_city,to_city,travels_id,seats,passengers_info)
    values($1,$2,$3,$4,$5,$6,$7,$8)`,
      [id, travels_name, date, from_city, to_city, travels_id, seats, p_info]
    );
    let { rows } = await pool.query("select * from dates where travels_id = $1 and date = $2", [travels_id, date]);
    if (rows.length) {
      let dates_id = rows[0].id;
      await pool.query("update dates set seats = $1 where id = $2", [selectedDate.seats, dates_id]);
    } else {
      await pool.query("insert into dates(date,seats,travels_id) values($1,$2,$3)", [selectedDate.date, selectedDate.seats, travels_id]);
    }
    let data = await pool.query("select * from users_info where users_id = $1", [req.user.id]);
    res.status(200).json(data.rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTravelsById = async (req, res) => {
  try {
    let { id } = req.body;
    let travels = await pool.query("select * from travels where id = $1", [id]);
    let travel_data = await pool.query("select * from dates where travels_id = $1", [id]);
    let newTravels = {
      ...travels.rows[0],
      dates: travel_data.rows
    };
    res.status(200).json(newTravels);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { usersTicketInfo, cancelTicket, filterTravels, bookTravels, getTravelsById };
