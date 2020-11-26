module.exports = {
  server: ['app.js', 'index.js', '.env', 'integration.test.js'],
  'server/controllers': ['message.controllers.js', 'message.controllers.test.js'],
  'server/models': ['index.js', 'message.models.js', 'message.models.test.js'],
  'server/routers': ['router.js'],
  'server/services': ['index.js', 'deleteMessage.js', 'getMessages.js', 'postMessage.js', 'updateMessage.js'],
  'server/socket': ['index.js', 'index.test.js'],
  'server/eventHandlers': ['index.js', 'newMessage.js', 'newSocket.js', 'onDisconnect.js'],
};
