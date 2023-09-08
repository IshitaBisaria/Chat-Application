const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/chats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/chats.html"));
});

module.exports = router;
