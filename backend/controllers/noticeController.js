const Notice = require("../models/Notice");

// Get All Notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Notice
const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Notice
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(notice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Notice
const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);

    res.json({
      message: "Notice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
};