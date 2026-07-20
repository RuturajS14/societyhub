const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  getResidentComplaints,
} = require("../controllers/complaintController");

// Resident
router.post("/", createComplaint);
router.get("/resident/:email", getResidentComplaints);

// Admin
router.get("/", getAllComplaints);
router.put("/:id", updateComplaintStatus);

module.exports = router;