const db = require('../models');

exports.updateMessage = async (id, message) => {
  const messageToUpdate = await db.Message.findOne({ where: { id } });
  messageToUpdate.message = message;
  await messageToUpdate.save();
  return messageToUpdate;
};
