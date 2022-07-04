const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    userName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;