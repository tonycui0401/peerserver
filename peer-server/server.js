require('dotenv').config()
// const express = require("express");
// const { ExpressPeerServer } = require("peer");

// const app = express();

// app.get("/", (req, res, next) => res.send("Hello world!"));

// const http = require("http");

// const server = http.createServer(express);
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/",
// });

// app.use("/peerjs", peerServer);

// server.listen(process.env.PORT || 9000);


// const express = require('express');
// const { ExpressPeerServer } = require('peer');

// const app = express();

// app.get('/', (req, res, next) => res.send('Hello world!'));

// // =======

// const server = app.listen(9000);

// const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

// console.log(customGenerationFunction);

// const peerServer = ExpressPeerServer(server, {
//   // path: '/myapp'
//   port: 9000,
//   path: '/myapp',
//   generateClientId: customGenerationFunction
// });

// app.use('/peerjs', peerServer);

// // == OR ==

// const http = require('http');

// const server = http.createServer(app);
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: '/myapp'
// });

// app.use('/peerjs', peerServer);

// server.listen(9000);


// // initialize express
// var express = require('express');
// var app = express();
// // create express peer server
// var ExpressPeerServer = require('peer').ExpressPeerServer;

// var options = {
//     debug: true
// }

// // create a http server instance to listen to request
// var server = require('http').createServer(app);

// // peerjs is the path that the peerjs server will be connected to.
// app.use('/peerjs', ExpressPeerServer(server, options));
// // Now listen to your ip and port.
// server.listen(8878, "http://18.168.149.207/");


// const express = require("express");
// const http = require('http');
// const path = require('path');
// const app = express();
// const server = http.createServer(app);
// const { ExpressPeerServer } = require('peer');
// const port = process.env.PORT || "8000";

// const peerServer = ExpressPeerServer(server, {
//     proxied: true,
//     debug: true,
//     path: '/myapp',
//     ssl: {},
//     generateClientId: '12345',
// });

// app.use(peerServer);

// app.use(express.static(path.join(__dirname)));

// app.get("/", (request, response) => {
//     // response.sendFile(__dirname + "/index.html");
//     response.send('Hello world!');
// });

// server.listen(port);
// console.log('Listening on: ' + port);







// var fs = require('fs');
// var PeerServer = require('peer').PeerServer;

// var server = PeerServer({
//     port: 9000,
//     path: '/peerjs',
//     ssl: {
//         // key: fs.readFileSync('./../certificates/key.pem', 'utf8'),
//         // cert: fs.readFileSync('./../certificates/cert.pem', 'utf8')
//     }
// });




const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { ExpressPeerServer } = require("peer");
// const mongoose = require("mongoose");
// const config = require("config");

const app = express();

const server = http.createServer(app);
const io = socketio(server).sockets;

//** Peer Server */
const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});

app.use("/mypeer", peerServer);

//** Config */
// const db = config.get("mongoURI");

//* Websocket *//
io.on("connection", function (socket) {});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));