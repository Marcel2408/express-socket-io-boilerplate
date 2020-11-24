const Message = require('../models/message.models');

exports.getMessages = () => Message.find();
