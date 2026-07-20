const express = require("express");
const router = express.Router();

const {
  getResidents,
  updateResidentStatus,
} = require("../controllers/adminController");

router.get("/residents", getResidents);

router.put("/residents/:id", updateResidentStatus);

module.exports = router;