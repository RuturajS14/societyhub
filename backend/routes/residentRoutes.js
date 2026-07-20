const express = require("express");
const router = express.Router();

const {
  getProfile,
  getApprovedResidents,
} = require("../controllers/residentController");

const protect = require("../middleware/authMiddleware");

// Logged-in Resident Profile
router.get("/profile", protect, getProfile);

// Get All Approved Residents
router.get("/", getApprovedResidents);

module.exports = router;