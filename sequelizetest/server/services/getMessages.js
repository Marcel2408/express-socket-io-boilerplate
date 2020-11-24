const db = require('../models');

exports.getMessages = () => db.Message.findAll();
