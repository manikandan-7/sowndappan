var client = require("../config/elasticsearch.config");

const getTravelsFromElasticSearch = async () => {
  try {
    const response = await client.search({ index: "travels", type: "travels" });
    return response.hits.hits;
  } catch (error) {
    console.trace(error.message);
  }
};

module.exports = { getTravelsFromElasticSearch };
