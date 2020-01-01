const expect = require("chai").expect;

const server_check_status = (err, res, body) => {
  expect(res.statusCode).to.equal(200);
};

const server_check_data = (err, res) => {
  expect(res.body.data).to.equal("data");
};

module.exports = { server_check_status, server_check_data };
