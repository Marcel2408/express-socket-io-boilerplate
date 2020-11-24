const services = require('../services');

exports.newMessage = async (socket, {socketId, message}) => {
  try {
    const msg = await services.postMessage(socketId, message);
    socket.emit('/root/update_chat', {
      message: msg.message,
      socketId: msg.socketId,
      sender: 'user',
    });
    socket.broadcast.emit('/root/update_chat', {
      message: msg.message,
      socketId: msg.socketId,
      sender: 'server',
    });
  } catch (error) {
    console.error(error);
  }
};
