const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const util = require('util');
const socketIO = require('socket.io');
const moment = require('moment');


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'src')));

io.on("connect", (socket)=>{
    util.log("The client is connected.")
    socket.on("roomID", (data)=>{
        util.log(data);
        const {name, msg} = data;
        io.emit("roomID", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm:ss A")
        });
    })
})


server.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})