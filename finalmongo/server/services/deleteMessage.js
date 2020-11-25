const Message = require('../models/message.models');

exports.deleteMessage = (id) => Message.deleteOne({ _id: id });
