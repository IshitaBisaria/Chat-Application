const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  readBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
