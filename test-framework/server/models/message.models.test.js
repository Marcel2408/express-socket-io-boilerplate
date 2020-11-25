const db = require('./index.js');
const Message = require('./message.models');

const mockMessage1 = {
  socketId: 'skdjbncr984',
  message: 'Nice!',
};

const mockMessage2 = {
  socketId: 'skdjgag7982',
  message: 'Nice second message!',
};

const updateMessage = 'Nice, we can update this!';

beforeAll((done) => {
  db.connection.on('connected', () => {
    done();
  });
});

afterAll((done) => {
  db.connection.dropDatabase()
    .then(() => {
      db.disconnect();
      done();
    });
});

describe('Message model unit tests', () => {
  describe('Check post messages', () => {
    it('Post message should post message to database and return the message and id', () => {
      expect.assertions(2);
      return Message.create(mockMessage1)
        .then((message) => {
          expect(message.socketId).toBe(mockMessage1.socketId);
          expect(message.message).toBe(mockMessage1.message);
        });
    });
    it('Should post and return the second message', () => {
      expect.assertions(2);
      return Message.create(mockMessage2)
        .then((message) => {
          expect(message.socketId).toBe(mockMessage2.socketId);
          expect(message.message).toBe(mockMessage2.message);
        });
    });
  });

  describe('Check get messages', () => {
    it('get message should get a message from the database', () => {
      expect.assertions(2);
      return Message.findOne({ socketId: mockMessage2.socketId })
        .then((message) => {
          expect(message.socketId).toBe(mockMessage2.socketId);
          expect(message.message).toBe(mockMessage2.message);
        });
    });
    it('get all messages should get a message from the database', () => {
      expect.assertions(3);
      return Message.find()
        .then((messages) => {
          expect(messages.length).toBe(2);
          expect(messages[0].socketId).toBe(mockMessage1.socketId);
          expect(messages[1].socketId).toBe(mockMessage2.socketId);
        });
    });
  });

  describe('Check update messages', () => {
    beforeEach(async (done) => {
      const messageToUpdate = await Message.findOne({ socketId: mockMessage2.socketId });
      messageToUpdate.message = updateMessage;
      await messageToUpdate.save();
      done();
    });
    it('update message should get a message from the database and udpate it', () => {
      expect.assertions(1);
      return Message.findOne({ socketId: mockMessage2.socketId })
        .then((updatedMessage) => {
          expect(updatedMessage.message).toBe(updateMessage);
        });
    });
  });

  describe('Check delete messages', () => {
    beforeEach(async (done) => {
      await Message.deleteOne({ socketId: mockMessage2.socketId });
      done();
    });
    it('delete message should delete a message from the database', () => {
      expect.assertions(2);
      return Message.find()
        .then((messages) => {
          expect(messages.length).toBe(1);
          expect(messages[0].socketId).toBe(mockMessage1.socketId);
        });
    });
  });
});
