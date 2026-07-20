const User = require("../models/User");

// Get Logged-in Resident Profile
const getProfile = async (req, res) => {
  try {
    const resident = await User.findById(req.user.id).select("-password");

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    res.status(200).json(resident);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Approved Residents
const getApprovedResidents = async (req, res) => {
  try {
    const residents = await User.find({
      role: "resident",
      status: "Approved",
    }).select("-password");

    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  getApprovedResidents,
};