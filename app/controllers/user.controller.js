const User = require("../models/user.model");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.userId,
    req.body,
    { new: true }
  ).select("-password");

  res.json(updated);
};
