let { pool } = require("../config/database.config");
let { findUser } = require("../model/user.model");

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
    console.log(id);
    let bookedSeat = ticket.seats;
    console.log(ticket.seats);
    let data = await pool.query("select * from dates where id = $1 and date = $2", [id, ticket.date]);
    newSeats = data.rows[0].seats;
    console.log(newSeats);
    for (var i = 0; i < bookedSeat.length; i++) newSeats[bookedSeat[i]] = "0";
    await pool.query("delete from dates where id = $1", [id]);
    await pool.query("insert into dates(date,seats,travels_id) values($1,$2,$3)", [ticket.date, newSeats, ticket.travels_id]);
    await pool.query("delete from users_info where id = $1", [id]);
    let { email } = req.user;
    let user = await findUser(email);
    let { rows } = await pool.query("select * from users_info where users_id = $1", [user.id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err);
  }
};

const filterTravels = async (req, res) => {
  try {
    let { from_city, to_city } = req.body;
    let { rows } = await pool.query("select * from travels where from_city = $1 and to_city = $2", [from_city, to_city]);
    res.status(200).json(rows);
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
    console.log(newBooking);
    console.log(selectedDate);
    await pool.query("delete from dates where id = $1", [selectedDate.id]);
    await pool.query("insert into dates(date,seats,travels_id) values($1,$2,$3)", [selectedDate.date, selectedDate.seats, travels_id]);
    await pool.query(
      `insert into users_info(users_id,travels_name,date,from_city,to_city,travels_id,seats,passengers_info)
    values($1,$2,$3,$4,$5,$6,$7,$8)`,
      [id, travels_name, date, from_city, to_city, travels_id, seats, p_info]
    );
    let { rows } = await pool.query("select * from users_info where users_id = $1", [id]);
    res.status(200).json(rows);
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
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { usersTicketInfo, cancelTicket, filterTravels, bookTravels, getTravelsById };
