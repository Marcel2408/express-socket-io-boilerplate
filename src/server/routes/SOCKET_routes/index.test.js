const app = require('../../app.js');
const http = require('http').createServer(app);
const io = require('socket.io-client');
const ioServer = require('./index');

describe.only('Suite of unit tests', () => {
  let socket;

  beforeAll((done) => {
    ioServer.attach(http.listen(3000));
    done();
  });

  afterAll((done) => {
    ioServer.close();
    done();
  });

  beforeEach((done) => {
    // Setup
    socket = io.connect('http://localhost:3000', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
    });
    socket.on('connect', () => {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', () => {
      console.log('disconnected...');
    });
  });

  afterEach((done) => {
    // Cleanup
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      console.log('no connection to break...');
    }
    done();
  });

  describe('First (hopefully useful) test', () => {
    it('Check socket connects', (done) => {
      ioServer.emit('echo', 'Hello World');
      socket.once('echo', (message) => {
        expect(message).toBe('Hello World');
        done();
      });
    });
    it('Check socket disconnects', (done) => {
      socket.disconnect();
      expect(socket.connected).toBe(false);
      done();
    });
  });
});
