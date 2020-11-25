const Message = require('../models/message.models');

exports.postMessage = (socketId, message) => Message.create({ socketId, message });
