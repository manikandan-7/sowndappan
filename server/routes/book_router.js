const router = require("express").Router(),
  passport = require("passport"),
  { usersTicketInfo, cancelTicket, filterTravels, bookTravels, getTravelsById } = require("../controllers").book;
const users_info = require("../controllers").users_info;
const travels = require("../controllers").travels;
const dates = require("../controllers").dates;

router.post("/usersInfo", users_info.createUserInfo);
router.post("/travels", travels.createTravels);
router.post("/dates", dates.createDates);

router.get("/usersTicketInfo", passport.authenticate("jwt", { session: false }), usersTicketInfo);

router.post("/cancelTicket", passport.authenticate("jwt", { session: false }), cancelTicket);

router.post("/filter", passport.authenticate("jwt", { session: false }), filterTravels);

router.post("/getTravelsById", passport.authenticate("jwt", { session: false }), getTravelsById);

router.post("/bookTravels", passport.authenticate("jwt", { session: false }), bookTravels);

module.exports = router;