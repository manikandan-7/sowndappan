const travels = require("../models").travels;
var client = require("../config/elasticsearch.config");
const { createIndex } = require("../services/elasticsearch_service");
const fetchAndStoreDataintoElasticSearch = async () => {
  let rows = [],
    allTravels = await travels.findAll();
  allTravels.forEach(i => rows.push(i.dataValues));
  await createIndex("travels");
  await rows.forEach(async data => {
    let body = { travels_name: data.travels_name, from_city: data.from_city, to_city: data.to_city, time: data.time, no_of_seats: data.no_of_seats, price: data.price };
    await client.index({ index: "travels", id: data.id, type: "travels", body: body });
  });
  console.log("ElasticSearch :: Data insert into Travels index successfully");
};

fetchAndStoreDataintoElasticSearch();
