const { pool } = require("../config/database.config");
var client = require("../config/elasticsearch.config");
const { createIndex } = require("../service/elasticsearch.service");
const fetchAndStoreDataintoElasticSearch = async () => {
  let { rows } = await pool.query("select * from travels;");
  await createIndex("travels");
  await rows.forEach(async data => {
    let body = { travels_name: data.travels_name, from_city: data.from_city, to_city: data.to_city, no_of_seats: data.no_of_seats };
    await client.index({ index: "travels", id: data.id, type: "travels", body: body });
  });
  console.log("ElasticSearch :: Data insert into Travels index successfully");
};

fetchAndStoreDataintoElasticSearch();
