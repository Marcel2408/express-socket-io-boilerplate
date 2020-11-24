const io = require('socket.io')();
// const { newSocketConnected, newMessage, onDisconnect } = require('../event_Handlers/index.js');
const eventHandlers = require('../event_Handlers/index.js');

io.on('connection', (socket) => {
  socket.on('/root/new_socket_connected', () => eventHandlers.newSocketConnected(io, socket));

  socket.on('/root/new_message', (message) => eventHandlers.newMessage(socket, message));

  socket.on('disconnect', () => eventHandlers.onDisconnect(io, socket));
});

module.exports = io;
