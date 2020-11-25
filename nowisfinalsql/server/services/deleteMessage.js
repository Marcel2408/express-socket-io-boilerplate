const db = require('../models');

exports.deleteMessage = (id) => db.Message.destroy({ where: { id } });
