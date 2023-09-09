const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", userRoutes);
app.use("/api/", chatRoutes);

app.listen(PORT, () => {
  console.log(`The App started on port ${PORT}`);
});
