const express = require('express');
const cors = require('cors');
const router = require('./routers/router.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/../public`));
app.use(router);

module.exports = app;
