const router = require("express").Router();
const chat = require("../controllers").chat;
const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), chat.newChat);
router.post("/all", passport.authenticate("jwt", { session: false }), chat.getAllChats);

module.exports = router;
