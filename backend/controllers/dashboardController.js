const Resident = require("../models/Resident");
const Complaint = require("../models/Complaint");
const Maintenance = require("../models/Maintenance");
const Visitor = require("../models/Visitor");
const Notice = require("../models/Notice");
const Amenity = require("../models/Amenity");
const Staff = require("../models/Staff");

const getDashboardStats = async (req, res) => {
  try {
    const residents = await Resident.countDocuments();
    const complaints = await Complaint.countDocuments();
    const maintenance = await Maintenance.countDocuments();
    const visitors = await Visitor.countDocuments();
    const notices = await Notice.countDocuments();
    const amenities = await Amenity.countDocuments();
    const staff = await Staff.countDocuments();

    res.json({
      residents,
      complaints,
      maintenance,
      visitors,
      notices,
      amenities,
      staff,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};