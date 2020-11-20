const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const messageSchema = new Schema({
  socketId: { type: Number, required: true },
  message: { type: String, required: true },
}, {
  versionKey: false,
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
