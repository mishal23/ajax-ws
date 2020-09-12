var express = require('express');
var path = require('path');
const http = require('http');
const socketio = require('socket.io');

var app = express();

const server = http.createServer(app);
const io = socketio(server);
// set static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){

    socket.on('silly-hacks', function(data){
        socket.emit('resp', data);
    });

    // socket.emit: emit to the client
    // io.emit: emit to everyone on the systen
    // socket.broadcast.emit: emit to everyone on the system except for the client
});

app.get('/ajax', function(req, res){
    res.send("GET request received");
});

server.listen(3000, function(req, res){
    console.log("Server listening on port 3000");
});
