const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./util/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("A new user just connected");

    socket.emit('createStar', {
        title: "allAboutLove",
        users: 25,
        shortDesc: "Love is in the air",
        badWords: false
    })

    socket.emit('newMessage', generateMessage('fellowBot', 'Welcome to the space'))
    socket.broadcast.emit('newMessage', generateMessage('fellowBot', 'A new Anonymous user joined'))

    socket.on('createMessage', (message, callback) => {
        console.log("Create Message", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is the server');
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    })
    
})


server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
})