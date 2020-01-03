const expect = require("chai").expect;

const book_user_ticket_info = (err, res) => {
  let { body } = res;
  expect(res.statusCode).to.equal(200);
  expect(body).length.to.not.equal(0);
};

const book_user_with_token = (err, res) => {
  let { body } = res;
  expect(res.statusCode).to.equal(200);
};

const book_user_with_out_token = (err, res) => {
  expect(res.statusCode).to.equal(401);
};

const book_user_with_out_data = (err, res) => {
  expect(res.statusCode).to.equal(400);
};

module.exports = {
  book_user_ticket_info,
  book_user_with_token,
  book_user_with_out_token,
  book_user_with_out_data
};
