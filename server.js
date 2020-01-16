const express = require("express");
const logger = require("morgan");
const http = require("http");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const server = http.Server(app);
const io = socket(server);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./server/doc/letsgo.json");

//middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require("./server/config/passport")(passport);
require("./server/services/pusher_services");
app.use(require("./server/routes"));
require("./server/setup/travels.setup");

//socket
io.on("connection", socket => {
  console.log(`client connected id === ${socket.id}`);
  socket.emit("intro", "Hello from server");
  socket.on("greetings", data => {
    socket.broadcast.emit("adminGreetings", data);
  });
  socket.on("send", data => {
    socket.broadcast.emit("recieve", data);
  });
  socket.on("disconnect", () => console.log("Client disconnected"));
});

//server
server.listen(5000, () => console.log("Server Started in 5000"));

module.exports = app;
