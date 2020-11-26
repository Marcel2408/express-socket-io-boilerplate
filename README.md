# EXPRESS-SOCKET.IO-BOILERPLATE

## Introduction

A CLI to quickly create a basic set-up for applications using Express and Socket.io

The backend is based on NodeJS with [express](https://www.npmjs.com/package/express) and [socket.io](https://www.npmjs.com/package/socket.io).

The frontend consists of a simple landing page with HTML, CSS and JS and [socket.io-client](https://www.npmjs.com/package/socket.io-client).

## Requirements

Node v7.6.0 or higher for ES2015 and async function support.

## Installation

To make the package available in the shell as a standalone command, it requires a global installation: npm install -g express-socket-io-boilerplate

## Getting Started

The package installs the required folder structure along with a fully integrated testing framework and example database of your choice.
It comes out of the box with environment variables, to allow you to easily run npm test, npm run dev, or npm start to run your program at whatever stage of development you are.
It also runs the following commands to get all the required dependencies to get your project up and running: 
```bash
    npm i express, cors, dotenv, socket.io, socket.io-client
    npm i jest nodemon -D
```

To create an express and socket.io boilerplate in your current directory:
```bash
express-socket-io-boilerplate <applicationName>
```

### Database
When you run the command, you will be prompted to enter what kind of database you will be working with.
This will generate an example structure for you to work with.

**If you choose PostgreSQL, go to .env and update your username and password.**
**If you do not have the database already created then the server will not run**
**Whenever you're running the server or tests, make sure you have an open connection to the DB**


### Scripts
The database works with environment variables, depending whether you are in production, development or testing.
If you're on Windows, and get 
```bash
'NODE_ENV' is not recognized as an internal or external command, operable program or batch file
```
run:
```bash
npm install --save-optional win-node-env
```
to set (common) environment variables.

If you wish to run your tests, run:
```bash
npm test
```
The tests will start using your `${DB_NAME}`_test.
These tests work out of the box, and feel free to modify them to meet your requirements as your code changes.
**Make sure you have this database set up otherwise your tests will fail**

If you wish to run your server in development, run: 
```bash
npm run dev
```
This will run your server using nodemon with your database in `${DB_NAME}`_dev, allowing you to make development changes without effecting the production.
**Make sure you have this database set up otherwise starting your server will fail**

If you wish to run your server in production, run: 
```bash
npm run dev
```
This will run your server using node with your database in `${DB_NAME}`.
**Make sure you have this database set up otherwise starting your server will fail**

##### If you run your server without one of these scripts it will default to production

### Testing Framework

We have included out of the box integration and unit testing.
Feel free to use these as a template for your future tests as your code grows.
There are 4 main areas we cover:
    Model Testing
        The tests ensure that the models interact with the database as expected.
    Controller Testing
        By mocking the services which interact with the models, these tests check that the controllers behave as expected.
    Socket Testing
        By mocking the services, these tests isolate the sockets and ensure the connections and disconnections take place. They also ensure that they can emit and receive events as expected.
    Integration Testing
        The integration test the flow of data from start to finish. Using mock data and the test database the tests are able to check that:
        - the controllers correctly pass information to the services
        - the services interact with the models as expected
        - the models succesfuly create, read, update, and delete information when interacting with the database.


### Folder Structure
The express-socket-io-boilerplate generates the following folder structure:
```bash
└── your_project_name
    ├── public
    |   ├── index.html
    |   ├── style.css
    |   └── index.js
    |
    ├── server
    |   ├── app.js
    |   ├── index.js
    |   ├── integration.test.js
    |   ├── .env
    |   ├── controllers
    |   |       ├── messasge.controllers.js
    |   |       └── message.controllers.test.js
    |   ├── eventHandlers
    |   |       ├── index.js
    |   |       ├── newMessage.js
    |   |       ├── newSocket.js
    |   |       └── onDisconnect.js
    |   ├── models
    |   |       ├──index.js
    |   |       ├── message.models.js
    |   |       └── message.models.test.js
    |   ├── routers
    |   |   └─── router.js 
    |   ├── services
    |   |       ├──index.js
    |   |       ├──deleteMessage.js
    |   |       ├──getMessages.js
    |   |       ├── postMessage.js
    |   |       └── updateMessage.js 
    |   ├── sockets
    |   |       ├──index.js
    |   |       └── index.test.js 
    ├── package.json
    ├── package-lock.json
    └── .git
```



### Commands
From the server directory run nodemon to start the server.