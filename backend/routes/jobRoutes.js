const express = require("express");
const {
    getAllJobs,
    createJob,
} = require("../controllers/jobController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getAllJobs);
router.post("/", protect, authorize("admin"), createJob);

module.exports = router;
