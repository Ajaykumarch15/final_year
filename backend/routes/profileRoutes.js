const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profileController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Student only
router.get("/me", protect, authorize("student"), getMyProfile);
router.put("/me", protect, authorize("student"), updateMyProfile);

module.exports = router;
