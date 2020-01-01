const router = require("express").Router();

router.use("/auth", require("./user.router"));
router.use("/book", require("./book.router"));

module.exports = router;
