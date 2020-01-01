const { pool } = require("../config/database.config");

const createUserInfo = async () => {
  await pool.query(`CREATE TABLE users_info(id SERIAL PRIMARY KEY, 
    users_id INTEGER REFERENCES users(id),
    travels_name VARCHAR(30),
    date VARCHAR(20),
    from_city VARCHAR(20),
    to_city VARCHAR(20),
    travels_id INTEGER,
    seats INTEGER[3],
    passengers_info JSON);`);
};

const dropTable = async () => {
  await pool.query("drop table users_info");
};

const seeUserInfo = async () => {
  let { rows } = await pool.query("select * from users_info");
  console.log(rows[0].passengers_info);
};

const travelsName = ["Ganapathi Travels", "Ganapathi Travels", "Red Bus", "Red Bus", "Fask Book", "Fask Book"];
const from_city = ["coimbatore", "chennai", "salem", "chennai", "salem", "coimbatore"];
const to_city = ["chennai", "coimbatore", "chennai", "salem", "coimbatore", "salem"];

const insertTravelsDetails = async () => {
  const info1 = `[
    {
      "name": "Somu",
      "gender": "male",
      "ph": "1234567890"
    },
    {
        "name": "Kabi",
        "gender": "female",
        "ph": "1234567890"
    }
  ]`;
  const info2 = `[
    {
      "name": "Somu",
      "gender": "male",
      "ph": "1234567890"
    },
    {
          "name": "Aaru",
          "gender": "female",
          "ph": "1234567890"
    }
  ]`;

  await pool.query(
    `insert into users_info(users_id,travels_name,date,from_city,to_city,travels_id,seats,passengers_info)
   values($1,$2,$3,$4,$5,$6,$7,$8)`,
    [1, "Red Bus", "1/1/2020", "salem", "chennai", 3, [6, 7], info1]
  );
  await pool.query(
    `insert into users_info(users_id,travels_name,date,from_city,to_city,travels_id,seats,passengers_info)
   values($1,$2,$3,$4,$5,$6,$7,$8)`,
    [1, "Ganapathi Travels", "2/1/2020", "coimbatore", "chennai", 1, [1, 3], info2]
  );
};

// createUserInfo();
// insertTravelsDetails();
// seeUserInfo();
// dropTable();
