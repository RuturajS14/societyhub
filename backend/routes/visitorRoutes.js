const express = require("express");
const router = express.Router();

const {
  getVisitors,
  addVisitor,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitorController");

router.get("/", getVisitors);
router.post("/", addVisitor);
router.put("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);

module.exports = router;