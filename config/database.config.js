const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "test123",
  host: "127.0.0.1",
  database: "postgres",
  port: "5432"
});

pool.connect().then(data => {
  console.log("started");
});

module.exports = { pool };
