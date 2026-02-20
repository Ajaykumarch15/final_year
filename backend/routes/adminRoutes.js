const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/adminController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/users", protect, authorize("admin"), getUsers);
router.post("/create-user", protect, authorize("admin"), createUser);
router.delete("/user/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
