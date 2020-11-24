const Message = require('../models/message.models');

exports.updateMessage = async (id, message) => {
  const messageToUpdate = await Message.findOne({ _id: id });
  messageToUpdate.message = message;
  await messageToUpdate.save();
  return messageToUpdate;
};
