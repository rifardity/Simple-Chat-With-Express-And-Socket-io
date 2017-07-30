const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3000, function() {
    console.log('App listening on port 3000!');
});

app.use(express.static(__dirname + '/public'));
var people = {};
var tempNama = '';
io.on('connection', (socket) => {
    socket.on('newUser', (nama) => {
        people[people.length] = nama;
        tempNama = nama;
        io.emit('listUser', people);
        io.emit('newUser', nama);
    });
    socket.on('newMessages', (msg, nama, time) => {
        io.emit('newMessages', msg, nama, time);
    });

    socket.on('disconnect', () => {
        io.emit('userDisconnect', tempNama);
    });

});