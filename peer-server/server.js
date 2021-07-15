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


const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/', (req, res, next) => res.send('Hello world!'));

// =======

const server = app.listen(9000);

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

console.log(customGenerationFunction);

const peerServer = ExpressPeerServer(server, {
  // path: '/myapp'
  port: 9000,
  path: '/myapp',
  generateClientId: customGenerationFunction
});

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