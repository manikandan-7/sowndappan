const express = require("express"),
  passport = require("passport"),
  router = express.Router();
const { register, login, userInfo, insertUser } = require("../controller/index").user;

router.post("/register", register);

router.post("/login", login);

router.get("/", passport.authenticate("jwt", { session: false }), userInfo);

router.post("/home", (req, res) => {
  res.status(200).json({ data: req.body.data });
});

router.get("/home", (req, res) => {
  res.status(200).json({ data: "trye" });
});

module.exports = router;
