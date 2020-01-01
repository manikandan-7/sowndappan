const { pool } = require("../config/database.config");

const createTravels = async () => {
  await pool.query(
    `CREATE TABLE travels(id SERIAL PRIMARY KEY,travels_name VARCHAR(20),from_city VARCHAR(20),to_city VARCHAR(20),no_of_seats INTEGER);`
  );
};

const dropTable = async () => {
  await pool.query("drop table travels");
};

const seetravels = async () => {
  let { rows } = await pool.query("select * from travels");
  console.log(rows);
};

const travelsName = ["Ganapathi Travels", "Ganapathi Travels", "Red Bus", "Red Bus", "Fask Book", "Fask Book"];
const from_city = ["coimbatore", "chennai", "salem", "chennai", "salem", "coimbatore"];
const to_city = ["chennai", "coimbatore", "chennai", "salem", "coimbatore", "salem"];

const insertTravelsDetails = async () => {
  for (var i = 0; i < travelsName.length; i++)
    await pool.query("INSERT INTO travels(travels_name,from_city,to_city,no_of_seats) values($1,$2,$3,$4);", [
      travelsName[i],
      from_city[i],
      to_city[i],
      20
    ]);
};

// createTravels();
// insertTravelsDetails();
// seetravels();
// dropTable();

const createDatesTable = async () => {
  await pool.query(
    "create table dates(id SERIAL PRIMARY KEY,date VARCHAR(20),seats VARCHAR[100],travels_id INTEGER REFERENCES travels(id));"
  );
};

const selectDatesTable = async () => {
  let { rows } = await pool.query("select * from dates;");
  console.log(rows);
};

const dropDatesTable = async () => {
  await pool.query("drop table dates");
};

const insertDatesDetails = async () => {
  let seats = [
    "male",
    "male",
    "male",
    "male",
    "male",
    "female",
    "female",
    "female",
    "female",
    "female",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0"
  ];
  let date = ["1/1/2020", "2/1/2020"];
  for (var i = 1; i <= 6; i++)
    for (var j = 0; j <= 1; j++) await pool.query("insert into dates(date,seats,travels_id) values($1,$2,$3)", [date[j], seats, i]);
};

const updateUser = async () => {
  let seats = [
    "female",
    "male",
    "male",
    "male",
    "male",
    "female",
    "female",
    "female",
    "female",
    "female",
    "male",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0"
  ];
  let data = await pool.query("update dates set seats = $1 where id = $2", [seats, 1]);
  console.log(data);
};

// createDatesTable();
// selectDatesTable();
// dropDatesTable();
// insertDatesDetails();
// updateUser();
