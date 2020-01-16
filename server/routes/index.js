const router = require("express").Router();

router.use("/book", require("./book_router"));
router.use("/auth", require("./users_router"));
router.use("/chats", require("./chat_router"));

module.exports = router;
