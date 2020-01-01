const express = require("express"),
  passport = require("passport"),
  { usersTicketInfo, cancelTicket, filterTravels, bookTravels, getTravelsById } = require("../controller").book;
router = express.Router();

router.get("/usersTicketInfo", passport.authenticate("jwt", { session: false }), usersTicketInfo);

router.post("/cancelTicket", passport.authenticate("jwt", { session: false }), cancelTicket);

router.post("/filter", passport.authenticate("jwt", { session: false }), filterTravels);

router.post("/getTravelsById", passport.authenticate("jwt", { session: false }), getTravelsById);

router.post("/bookTravels", passport.authenticate("jwt", { session: false }), bookTravels);

module.exports = router;
