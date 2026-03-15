const express = require("express");
const router = express.Router();

const {
  getMyMatches,
  getMatchesByUserId,
  getMatchOverview,
  getAnalytics,
  exportOverviewCSV,
  exportFilteredPDF, getLeaderboard, runAIMatching
} = require("../controllers/matchController");


const { protect, authorize } = require("../middleware/authMiddleware");

/*
  Student - Own matches
*/
router.get("/me", protect, authorize("student"), getMyMatches);

/*
  Staff/Admin - Student matches
*/
router.get(
  "/student/:userId",
  protect,
  authorize("staff", "admin"),
  getMatchesByUserId
);

/*
  Staff/Admin - Overview
*/
router.get(
  "/overview",
  protect,
  authorize("staff", "admin"),
  getMatchOverview
);

router.get(
  "/analytics",
  protect,
  authorize("staff", "admin"),
  getAnalytics
);

router.get(
  "/export",
  protect,
  authorize("staff", "admin"),
  exportOverviewCSV
);


router.get(
  "/export-pdf",
  protect,
  authorize("staff", "admin"),
  exportFilteredPDF
);

router.get(
  "/leaderboard",
  protect,
  authorize("staff", "admin"),
  getLeaderboard
);

// Run AI matching
router.post("/run-ai", protect, runAIMatching);

module.exports = router;
