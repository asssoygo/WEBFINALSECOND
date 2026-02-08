const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authConfig = require("../config/auth.config");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = bcrypt.hashSync(password, 8);

    await User.create({ username, email, password: hashed });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      authConfig.jwtSecret,
      { expiresIn: authConfig.jwtExpiration }
    );

    res.json({ accessToken: token });
  } catch (err) {
    next(err);
  }
};
