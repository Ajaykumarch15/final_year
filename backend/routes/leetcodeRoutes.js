import express from "express";
import { syncLeetCode } from "../controllers/leetcodeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sync", protect, syncLeetCode);

export default router;