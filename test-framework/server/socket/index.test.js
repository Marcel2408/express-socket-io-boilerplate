const io = require('socket.io-client');
const app = require('../app.js');
const http = require('http').createServer(app);
const ioServer = require('./index');

describe('Suite of unit tests', () => {
  let socket;
  let socket2;

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
    // socket.on('disconnect', () => {
    //   console.log('disconnected...');
    // });
  });

  beforeEach((done) => {
    socket2 = io.connect('http://localhost:3000', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
    });
    socket2.on('connect', () => {
      console.log('worked2...');
      done();
    });
    // socket2.on('disconnect', () => {
    //   console.log('disconnected2...');
    // });
  });

  afterEach((done) => {
    // Cleanup
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
      done();
    } else {
      console.log('no connection to break...');
    }
  });
  afterEach((done) => {
    // Cleanup
    if (socket2.connected) {
      console.log('disconnecting2...');
      socket2.disconnect();
      done();
    } else {
      console.log('no connection to break2...');
    }
  });

  describe('Unit tests for socket event handlers', () => {
    expect.assertions(1);
    it('Check socket connects', (done) => {
      ioServer.emit('echo', 'Hello World');
      socket.once('echo', (message) => {
        expect(message).toBe('Hello World');
        done();
      });
    });

    describe('onDisconnect', () => {
      expect.assertions(2);
      it('Check socket disconnects', (done) => {
        socket.disconnect();
        console.log('LINE 86', ioServer.sockets.server.eio.clients);
        expect(socket.connected).toBe(false);
        expect(ioServer.sockets.server.eio.clientsCount).toBe(1);
        done();
      });
    });
  });
});
