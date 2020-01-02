const express = require("express");
const bodyParser = require("body-parser");
const { pool } = require("./config/database.config");
const passport = require("passport");
const app = express();
const PORT = 5000;
const router = require("./routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

require("./setup/travels.setup");
module.exports = app;
