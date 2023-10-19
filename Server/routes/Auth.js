const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Users } = require("../db/db");
const jwt = require("jsonwebtoken");
const { json } = require("express");
router.post("/reg", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = 10;
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = Users({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();

    res.status(201).json({ message: "User created succesfully " });
  } catch (error) {
    res.status(500).json({ message: " Some error occured" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      "secret123"
    );
    res.status(200).json({ message: "User logged in", user: token });
  } catch (error) {
    res.status(500).json({ message: "Some error occurred" });
  }
});

module.exports = router;
