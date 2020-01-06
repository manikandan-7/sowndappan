var client = require("../config/elasticsearch.config");

const createIndex = async indexName => {
  console.log(`ElasticSearch :: Creating ${indexName} index in elastic search`);
  client.indices.create({ index: indexName }, (err, resp, status) => {
    console.log(`ElasticSearch :: ${indexName} index created`);
  });
};

const insertData = (index, id, type, body) => {
  client.index({ index: index, id: id, type: type, body: body }, (err, resp, status) => {
    console.log(resp);
  });
};

const countData = (index, type) => {
  client.count({ index: index, type: type }, function(err, resp, status) {
    console.log(resp);
  });
};

// const searchData = async (body, index, type) => {
//   await client.search({ index: index, type: type, body: body }, async (error, response, status) => {
//     if (error) console.log("search error: " + error);
//     else
//       await response.hits.hits.forEach(function(hit) {
//         console.log(hit._source);
//       });
//     return response.hits.hits;
//   });
// };

module.exports = { createIndex, insertData, countData };

// search(
//   {
//     query: {
//       match: { name: "hia" }
//     }
//   },
//   "room",
//   "room"
// );

// createIndex("room");
// insert(body);
