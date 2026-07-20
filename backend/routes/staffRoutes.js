const express = require("express");
const router = express.Router();

const {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");

router.get("/", getStaff);
router.post("/", addStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

module.exports = router;