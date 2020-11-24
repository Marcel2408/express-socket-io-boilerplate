exports.onDisconnect = (io, socket) => {
  const clientCount = io.sockets.server.eio.clientsCount;
  socket.broadcast.emit('root/update_socket_count', { clientCount });
};
