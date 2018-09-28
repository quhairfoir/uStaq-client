var express = require('express')
var app = express()


server = app.listen(3001, function () {
    console.log('server is running on port 3001')
});

var socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data)
    })
})