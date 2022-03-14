const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const util = require('util');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'src')));

io.on("connect", (socket) => {
    util.log(`The client is connected.`);
})

server.listen(PORT, () => {
    util.log(`Server is running on port: ${PORT}`);
})