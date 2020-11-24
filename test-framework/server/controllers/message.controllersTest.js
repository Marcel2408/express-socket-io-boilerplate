const { test } = require('shelljs');
const {
  getMessages, postMessage, deleteMessage, updateMessage,
} = require('./message.controllers');

const services = require('../services/index.js');

// ! why we need this
jest.mock('../services/index.js', () => ({ services: () => {} }));

const mockMessage = {
  _id: '498j8dlkajc',
  socketId: 'skdjbncr984',
  message: 'Nice!',
};

const mockUpdatedMessage = {
  _id: '498j8dlkajc',
  socketId: 'skdjbncr984',
  message: 'Nice! It is updated',
};

describe('Message controllers unit test', () => {
  const req = {};
  const req2 = {};
  const res = {
    send: jest.fn(() => res).mockName('send'),
    status: jest.fn(() => res).mockName('status'),
    sendStatus: jest.fn(() => res).mockName('sendStatus'),
  };

  describe('getMessages', () => {
    services.getMessages = jest.fn().mockResolvedValue([mockMessage]);

    it('services.getMessages should have been called once without args and respond with the right status and array of messages', () => {
      expect.assertions(4);
      return getMessages(req, res)
        .then(() => {
          expect(services.getMessages).toHaveBeenCalled();
          expect(services.getMessages)
            .toHaveBeenCalledWith();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith([mockMessage]);
        });
    });
  });

  describe('postMessage', () => {
    req.body = {
      socketId: mockMessage.socketId,
      message: mockMessage.message,
    };
    // res.status = 201;
    services.postMessage = jest.fn().mockResolvedValue(mockMessage);

    it('services.postMessage should have been called once with correct args and respond with the right status and postedMessage', () => {
      expect.assertions(4);
      return postMessage(req, res)
        .then(() => {
          console.log('mockMessage in post', req.body);
          expect(services.postMessage).toHaveBeenCalled();
          expect(services.postMessage)
            .toHaveBeenCalledWith(mockMessage.socketId, mockMessage.message);
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.send).toHaveBeenCalledWith(mockMessage);
        });
    });
  });

  describe('deleteMessage', () => {
    req.params = {
      // eslint-disable-next-line no-underscore-dangle
      id: mockMessage._id,
    };
    services.deleteMessage = jest.fn();

    it('services.deleteMessage should have been called once with the id as arg and respond with the right status', () => {
      expect.assertions(3);
      return deleteMessage(req, res)
        .then(() => {
          expect(services.deleteMessage).toHaveBeenCalled();
          expect(services.deleteMessage)
            .toHaveBeenCalledWith(mockMessage._id);
          expect(res.sendStatus).toHaveBeenCalledWith(204);
        });
    });
  });

  describe('updateMessage', () => {
    req2.body = {
      id: mockUpdatedMessage._id,
      message: mockUpdatedMessage.message,
    };
    services.updateMessage = jest.fn().mockResolvedValue(mockUpdatedMessage);

    it('services.updateMessage should have been called once with the correct args and respond with the right status and the updated message', () => {
      expect.assertions(4);
      return updateMessage(req2, res)
        .then(() => {
          expect(services.updateMessage).toHaveBeenCalled();
          expect(services.updateMessage)
            .toHaveBeenCalledWith(mockUpdatedMessage._id, mockUpdatedMessage.message);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith(mockUpdatedMessage);
        });
    });
  });
});
