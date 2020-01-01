const server = require("../../server");
const chai = require("chai");
const { BASE_URL } = require("../data/base.data");
const baseUrl = BASE_URL;
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { server_check_status, server_check_data } = require("../schema/index").serverSchema;

describe("Home Page", () => {
  it("Checking Status is 200", () => {
    chai
      .request(baseUrl)
      .get("/auth/home")
      .end(server_check_status);
  });
  it("Checking the returning data", () => {
    chai
      .request(baseUrl)
      .post("/auth/home")
      .send({ data: "data" })
      .end(server_check_data);
  });
});
