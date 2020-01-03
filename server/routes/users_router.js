const router = require("express").Router();
const users = require("../controllers").users;
const passport = require("passport");

router.post("/register", users.register);
router.post("/login", users.login);
router.get("/", passport.authenticate("jwt", { session: false }), users.userInfo);

module.exports = router;
