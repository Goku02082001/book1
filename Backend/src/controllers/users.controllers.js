const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");

require("dotenv").config();

const userDetails = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User is already registered. Please try to login." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.json({ token, role: user.role ,username: user.username});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
  userDetails,
};
