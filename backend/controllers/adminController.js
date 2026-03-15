const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");
const bcrypt = require("bcryptjs");
/*
  GET USERS
*/
const getUsers = async (req, res) => {
  try {
    const { search = "", role = "", page = 1, limit = 8 } = req.query;

    const query = {};

    if (role) query.role = role;
    if (search) query.name = { $regex: search, $options: "i" };

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      users,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*
  CREATE USER
*/
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, rollNo, branch } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔥 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === "student") {
      await StudentProfile.create({
        user: user._id,
        rollNo,
        branch,
        cgpa: 0,
        skills: [],
      });
    }

    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/*
  DELETE USER
*/
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    await StudentProfile.deleteOne({ user: req.params.id });

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
