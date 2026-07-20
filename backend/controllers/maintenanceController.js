const Maintenance = require("../models/Maintenance");

// Admin creates a maintenance bill
const createMaintenance = async (req, res) => {
  try {
    const bill = await Maintenance.create(req.body);

    res.status(201).json({
      message: "Maintenance bill created successfully",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin views all maintenance bills
const getAllMaintenance = async (req, res) => {
  try {
    const bills = await Maintenance.find().sort({
      createdAt: -1,
    });

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Resident views their maintenance bills
const getResidentMaintenance = async (req, res) => {
  try {
    const bills = await Maintenance.find({
      email: req.params.email,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Mark bill as Paid
const markAsPaid = async (req, res) => {
  try {
    const bill = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: "Paid" },
      { new: true }
    );

    res.status(200).json({
      message: "Payment updated successfully",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMaintenance,
  getAllMaintenance,
  getResidentMaintenance,
  markAsPaid,
};