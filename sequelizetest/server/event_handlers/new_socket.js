const { getMessages } = require('../services');

exports.newSocketConnected = async (io, socket) => {
  try {
    const messages = await getMessages();
    const clientCount = io.sockets.server.eio.clientsCount;
    socket.emit('/root/welcome', { messages, id: socket.id });
    io.sockets.emit('root/update_socket_count', { clientCount });
  } catch (error) {
    console.error(error);
  }
};
