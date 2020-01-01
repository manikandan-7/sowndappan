const expect = require("chai").expect;
const server = require("../../server");
const chai = require("chai");
const { BASE_URL, AUTH_TOKEN } = require("../data/base.data");
const { bookTravels, cancelTicket } = require("../data/book.data");
const baseUrl = BASE_URL;
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
const {
  book_user_ticket_info,
  book_user_with_token,
  book_user_with_out_token,
  book_user_with_out_data
} = require("../schema/index").bookSchema;

describe("Book Page", () => {
  describe("/usersTicketInfo", () => {
    it("Checking the /usersTicketInfo Route", () => {
      chai
        .request(baseUrl)
        .get("/book/usersTicketInfo")
        .set({ Authorization: AUTH_TOKEN })
        .end(book_user_ticket_info);
    });
  });

  describe("/bookTravels", () => {
    it("Checking the bookTravels Route with Token", () => {
      chai
        .request(baseUrl)
        .post("/book/bookTravels")
        .set({ Authorization: AUTH_TOKEN })
        .send(bookTravels)
        .end(book_user_with_token);
    });
    it("Checking the bookTravels Route without Token", () => {
      chai
        .request(baseUrl)
        .post("/book/bookTravels")
        .send(bookTravels)
        .end(book_user_with_out_token);
    });
    it("Checking the bookTravels Route without data", () => {
      chai
        .request(baseUrl)
        .post("/book/bookTravels")
        .set({ Authorization: AUTH_TOKEN })
        .send({})
        .end(book_user_with_out_data);
    });
    it("Checking the bookTravels Route without few data", () => {
      chai
        .request(baseUrl)
        .post("/book/bookTravels")
        .set({ Authorization: AUTH_TOKEN })
        .send({ newBooking: {} })
        .end(book_user_with_out_data);
    });
  });

  describe("/cancelTicket", () => {
    it("Checking the cancelTicket Route with Token", () => {
      chai
        .request(baseUrl)
        .post("/book/cancelTicket")
        .set({ Authorization: AUTH_TOKEN })
        .send(cancelTicket)
        .end(book_user_with_token);
    });
    it("Checking the bookTravels Route without Token", () => {
      chai
        .request(baseUrl)
        .post("/book/cancelTicket")
        .send(cancelTicket)
        .end(book_user_with_out_token);
    });
    it("Checking the bookTravels Route without data", () => {
      chai
        .request(baseUrl)
        .post("/book/cancelTicket")
        .set({ Authorization: AUTH_TOKEN })
        .send({})
        .end(book_user_with_out_data);
    });
    it("Checking the bookTravels Route without few data", () => {
      chai
        .request(baseUrl)
        .post("/book/cancelTicket")
        .set({ Authorization: AUTH_TOKEN })
        .send({ id: "" })
        .end(book_user_with_out_data);
    });
  });
});
