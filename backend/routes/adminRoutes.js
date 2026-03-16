const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getUsers,
  createUser,
  deleteUser,
  updateCGPAFromExcel,
} = require("../controllers/adminController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/users", protect, authorize("admin"), getUsers);
router.post("/create-user", protect, authorize("admin"), createUser);
router.delete("/user/:id", protect, authorize("admin"), deleteUser);
router.post("/upload-cgpa", upload.single("file"), updateCGPAFromExcel);

module.exports = router;
