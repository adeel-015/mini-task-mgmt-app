const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { asyncHandler, ApiError } = require("../utils/errorHandler");
const {
  signupValidation,
  loginValidation,
  handleValidationErrors,
} = require("../middleware/validate");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

router.post(
  "/signup",
  signupValidation,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) throw new ApiError(400, "User already exists");
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  })
);

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "Invalid credentials");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(400, "Invalid credentials");
    const token = generateToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  })
);

module.exports = router;
