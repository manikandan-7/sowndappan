const Pusher = require("pusher");
const { connection } = require("../config/pusher_config");
var pusher = new Pusher(connection);

module.exports = pusher;
