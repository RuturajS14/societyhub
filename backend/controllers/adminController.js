const User = require("../models/User");

// Get all residents
const getResidents = async (req, res) => {
  try {
    const residents = await User.find({ role: "resident" }).select("-password");
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update resident status
const updateResidentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    res.json({
      message: "Resident status updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getResidents,
  updateResidentStatus,
};