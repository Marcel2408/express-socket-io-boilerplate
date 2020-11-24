module.exports = {
  server: ['app.js', 'index.js', '.env'],
  'server/controllers': ['message.controllers.js', 'message.controllers.test.js'],
  'server/models': ['index.js', 'message.models.js'],
  'server/routers': ['router.js'],
  'server/services': ['index.js', 'deleteMessage.js', 'getMessages.js', 'postMessage.js', 'updateMessage.js'],
  'server/socket': ['index.js', 'index.test.js'],
  'server/event_handlers': ['index.js', 'new_message.js', 'new_socket.js', 'on_disconnect.js'],
};
