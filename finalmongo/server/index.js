/* eslint-disable no-console */
require('dotenv').config();
const http = require('http');
const app = require('./app');
const io = require('./socket');
const db = require('./models');

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

async function bootstrap() {
  await db.connection.on('connected', () => console.log('MongoDB is connected!'));
  return http.createServer(app).listen(port);
}

bootstrap()
  .then((server) => {
    io.attach(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    console.log(`Server listening at http://${hostname}:${server.address().port}`);
  })
  .catch((error) => {
    setImmediate(() => {
      console.error('Server Error:');
      console.error(error);
      process.exit();
    });
  });
