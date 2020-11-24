const io = require('socket.io')();
const { newSocketConnected, newMessage, onDisconnect } = require('../event_Handlers/index.js');

io.on('connection', (socket) => {
  socket.on('/root/new_socket_connected', () => newSocketConnected(io, socket));

  socket.on('/root/new_message', (message) => newMessage(socket, message));

  socket.on('disconnect', () => onDisconnect(io, socket));
});

module.exports = io;
