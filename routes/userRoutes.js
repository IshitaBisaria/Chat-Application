const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const path = require("path");

// In your userRoutes.js or other appropriate route file
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

// Registration route
router.post(
  "/signup",
  [
    body("username")
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be 3-30 characters long"),
    body("name").notEmpty().withMessage("No Name Provided"),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    // console.log("hello1");
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Destructure user registration data from request body
      console.log("hello");
      const { username, name, email, password } = req.body;
      console.log(username, name, email, password);

      // Check if the email or username already exists in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email or username already exists" });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with hashed password
      const newUser = new User({
        username,
        name,
        email,
        password: hashedPassword,
      });

      newUser.token = generateToken(newUser._id);

      // Save the new user to the database
      await newUser.save();

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
