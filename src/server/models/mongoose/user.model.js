const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const userSchema = new Schema({
  socketId: { type: Number, required: true },
}, {
  versionKey: false,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
