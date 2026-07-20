const express = require("express");
const router = express.Router();

const {
  createMaintenance,
  getAllMaintenance,
  getResidentMaintenance,
  markAsPaid,
} = require("../controllers/maintenanceController");

// Admin
router.post("/", createMaintenance);
router.get("/", getAllMaintenance);
router.put("/:id/pay", markAsPaid);

// Resident
router.get("/resident/:email", getResidentMaintenance);

module.exports = router;