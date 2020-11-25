const {
  getMessages,
  postMessage,
  deleteMessage,
  updateMessage,
} = require('./controllers/message.controllers');
const db = require('./models/index.js');
const Message = require('./models/message.models');

const mockMessage1 = {
  socketId: 'skdjbncr984',
  message: 'Nice!',
};

const mockMessage2 = {
  socketId: 'skdjgag7982',
  message: 'Nice second message!',
};

const updateMsg = 'Nice, we can update this!';

beforeAll((done) => {
  db.connection.on('connected', () => {
    done();
  });
});

afterAll((done) => {
  db.connection.dropDatabase().then(() => {
    db.disconnect();
    done();
  });
});

describe('Message controllers integration test', () => {
  const req = {};
  const req2 = {};
  const res = {
    send: jest
      .fn((data) => {
        res.send = data;
      })
      .mockName('send'),
    status: jest.fn(() => res).mockName('status'),
    sendStatus: jest.fn(() => res).mockName('sendStatus'),
  };

  afterEach(() => {
    res.send = jest
      .fn((data) => {
        res.send = data;
      })
      .mockName('send');
  });

  describe('postMessage', () => {
    req.body = {
      socketId: mockMessage1.socketId,
      message: mockMessage1.message,
    };

    it('postMessage should respond with the right status and postedMessage', () => {
      expect.assertions(2);
      return postMessage(req, res)
        .then(() => Message.findOne({ socketId: mockMessage1.socketId }))
        .then((message) => {
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.send._id).toStrictEqual(message._id);
        });
    });
  });

  describe('getMessages', () => {
    req2.body = {
      socketId: mockMessage2.socketId,
      message: mockMessage2.message,
    };

    it('getMessages should respond with the right status and array of mock messages', () => {
      expect.assertions(4);
      return Message.create(mockMessage2)
        .then(() => getMessages(req, res))
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveLength(2);
          expect(res.send[0].socketId).toStrictEqual(mockMessage1.socketId);
          expect(res.send[1].socketId).toStrictEqual(mockMessage2.socketId);
        });
    });
  });

  describe('updateMessage', () => {
    it('updateMessage should have been called once with the correct args and respond with the right status and the updated message', () => {
      expect.assertions(2);
      return Message.findOne({ socketId: mockMessage1.socketId })
        .then(({ _id }) => {
          req.body = {
            id: _id,
            message: updateMsg,
          };
          return updateMessage(req, res);
        })
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send.message).toStrictEqual(updateMsg);
        });
    });
  });

  describe('deleteMessage', () => {
    it('deleteMessage should respond with the right status', () => {
      expect.assertions(3);
      return Message.findOne({ socketId: mockMessage1.socketId })
        .then(({ _id }) => {
          req.params = {
            id: _id,
          };
          return deleteMessage(req, res);
        })
        .then(() => Message.find())
        .then((messages) => {
          expect(res.sendStatus).toHaveBeenCalledWith(204);
          expect(messages).not.toContainEqual({
            _id: req.params.id,
            socketId: mockMessage1.socketId,
            message: updateMsg,
          });
          expect(messages).toHaveLength(1);
        });
    });
  });
});
