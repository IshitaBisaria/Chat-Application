const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for sender
    ref: "User", // Reference the "User" model
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for receiver
    ref: "User", // Reference the "User" model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
