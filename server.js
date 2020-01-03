const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
// Set up the express app
const app = express();
app.use(logger("dev"));
app.listen(5000, () => console.log("Server Started in 3000"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./server/config/passport")(passport);
app.use(require("./server/routes"));

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness."
  })
);

require("./server/setup/travels.setup");
module.exports = app;
