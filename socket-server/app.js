// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// var cors = require("cors");
// var indexRouter = require("./routes/index");

// var app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use("/", indexRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render("error");
//   res.json({ error: err })
// });

// module.exports = app;

const express = require("express");
const app = express();
const port = 8001;
var server = require("http").Server(app);
const io = require("socket.io")(server);
// const users = require("./configs/users");
const cors = require("cors");
const moment = require('moment');


// io = socketio(server);
// io.users = {};

// const {local_endpoint, remote_endpoint, local_base} = require('./configs/config');


const local_endpoint = require('./configs/config');

const fetch = require('node-fetch');






app.use(cors());






io.users = {};


io.on("connection", function(socket) {


 



  socket.on("register", (username) => this.onRegister(socket, username));
      socket.on("set-peer-id", (peerId) => this.onSetPeerId(socket, peerId));
      socket.on("call", (username) => this.onCall(socket, username));
      socket.on("reject-call", (username) =>
        this.onRejectCall(socket, username)
      );
      socket.on("accept-call", (username) =>
        this.onAcceptCall(socket, username)
      );
      console.log(`${Date(Date.now()).toLocaleString()}: new user connected`);
      socket.on("disconnect", () => this.onDisconnect(socket));




 






});




onAcceptCall = (socket, username) => {
  if (io.users[username])
    io
      .to(io.users[username].socketId)
      .emit("accepted-call", io.users[socket.username]);
};

onRejectCall = (socket, username) => {
  if (io.users[username]) {
    io
      .to(io.users[username].socketId)
      .emit("rejected-call", io.users[socket.username]);
  }
};

onCall = (socket, username) => {
  if (io.users[username]) {
    io.to(io.users[username].socketId)
      .emit("call", io.users[socket.username]);
  } else {
    socket.emit("not-available", username);
  }
};

onRegister = (socket, username) => {
  console.log("Registered", username);
  socket.username = username;
  io.users[username] = {
    username,
    peerId: "",
    socketId: socket.id,
  };
  this.onUsersChange(socket);
};

getUsers = () => {
  const users = [];
  Object.keys(io.users).forEach((key) => {
    users.push(io.users[key]);
  });
  return users;
};

onUsersChange = (socket) => {
  io.emit("users-change", this.getUsers());
};

onSetPeerId = (socket, peerId) => {
  console.log("Set Peer Id user:", socket.username, " peerId: ", peerId);
  io.users[socket.username] = {
    peerId,
    socketId: socket.id,
    username: socket.username,
  };
  this.onUsersChange();
};

onDisconnect = (socket) => {
  delete io.users[socket.username];
  console.log(
    `${Date(Date.now()).toLocaleString()} ID:${
      socket.username
    } user disconnected`
  );
  this.onUsersChange();
};

emit = (event, userId, data) => {
  if (io.users[userId]) {
    io.to(io.users[userId]).emit(event, data);
  }
};




server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
