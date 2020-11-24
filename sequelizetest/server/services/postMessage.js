const db = require('../models');

exports.postMessage = (socketId, message) => db.Message.create({ socketId, message });
