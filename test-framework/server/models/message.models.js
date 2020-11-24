const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  socketId: { type: String, required: true },
  message: { type: String, required: true },
}, {
  versionKey: false,
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
