const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

/*
  ADMIN - Get all users
*/
router.get("/", protect, authorize("admin"), getAllUsers);

/*
  ADMIN - Get single user
*/
router.get("/:id", protect, authorize("admin"), getUserById);

module.exports = router;
