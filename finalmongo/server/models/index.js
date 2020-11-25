const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const currentDb = (process.env.NODE_ENV === 'TEST'
  ? process.env.DB_TEST_NAME
  : process.env.DB_NAME);

mongoose.connect(`mongodb://localhost:27017/${currentDb}`, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
