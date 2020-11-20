/* eslint-disable no-console */
const messageModel = require('../../models/message.models');
const userModel = require('../../models/user.models');

// Helper functions

function addUser(id) {
  userModel.main_room.push({ id, messageCount: 0 });
  return userModel.main_room;
}

function removeUser(id) {
  userModel.main_room = userModel.main_room.filter((user) => user.id !== id);
  return userModel.main_room;
}

function getMessageCount(id) {
  const { length } = messageModel.chatMessages;
  const user = userModel.main_room.find((el) => el.id === id);
  let { messageCount } = user;
  if (messageCount !== length - 1) messageCount += 1;
  return messageCount;
}

// Event handlers

exports.addToDB = (id) => {
  try {
    return addUser(id);
  } catch (error) {
    console.error(error);
  }
};

exports.welcomeClient = (data) => {
  try {
    const message = messageModel.welcomeMessage;
    return { message, sender: 'server' };
  } catch (error) {
    console.error(error);
  }
};

exports.sendMessageToClient = (data, id) => {
  try {
    if (userModel.main_room.length === 1) {
      const messageCount = getMessageCount(id);
      const message = messageModel.chatMessages[messageCount];
      return {
        message,
        sender: 'server',
      };
    }
    return {
      message: data,
    };
  } catch (error) {
    console.error(error);
  }
};

exports.onClientDisconnect = (id) => {
  const updatedClientList = removeUser(id);
  return updatedClientList;
};
