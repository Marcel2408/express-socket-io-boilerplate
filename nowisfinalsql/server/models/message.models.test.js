const db = require('./index.js');

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
  db.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
});

afterAll((done) => {
  db.sequelize.drop()
    .then(() => {
      db.sequelize.close();
      done();
    });
});

describe('Message model unit tests', () => {
  describe('Check post messages', () => {
    it('Post message should post message to database and return the message and id', () => {
      expect.assertions(3);
      return db.Message.create(mockMessage1)
        .then((message) => {
          expect(message.id).toBe(1);
          expect(message.socketId).toBe(mockMessage1.socketId);
          expect(message.message).toBe(mockMessage1.message);
        });
    });
    it('Should post and return the message', () => {
      expect.assertions(3);
      return db.Message.create(mockMessage2)
        .then((message) => {
          expect(message.id).toBe(2);
          expect(message.socketId).toBe(mockMessage2.socketId);
          expect(message.message).toBe(mockMessage2.message);
        });
    });
  });

  describe('Check get messages', () => {
    it('get message should get a message from the database', () => {
      expect.assertions(3);
      return db.Message.findOne({ where: { id: 2 } })
        .then((message) => {
          expect(message.id).toBe(2);
          expect(message.socketId).toBe(mockMessage2.socketId);
          expect(message.message).toBe(mockMessage2.message);
        });
    });
    it('get all messages should get a message from the database', () => {
      expect.assertions(3);
      return db.Message.findAll()
        .then((messages) => {
          expect(messages.length).toBe(2);
          expect(messages[0].id).toBe(1);
          expect(messages[1].id).toBe(2);
        });
    });
  });

  describe('Check update messages', () => {
    beforeEach(async (done) => {
      const messageToUpdate = await db.Message.findOne({ where: { id: 2 } });
      messageToUpdate.message = updateMessage;
      await messageToUpdate.save();
      done();
    });
    it('update message should get a message from the database and udpate it', () => {
      expect.assertions(1);
      return db.Message.findOne({ where: { id: 2 } })
        .then((updatedMessage) => {
          expect(updatedMessage.message).toBe(updateMessage);
        });
    });
  });

  describe('Check delete messages', () => {
    beforeEach(async (done) => {
      await db.Message.destroy({ where: { id: 2 } });
      done();
    });
    it('delete message should delete a message from the database', () => {
      expect.assertions(2);
      return db.Message.findAll()
        .then((messages) => {
          expect(messages.length).toBe(1);
          expect(messages[0].id).toBe(1);
        });
    });
  });
});

