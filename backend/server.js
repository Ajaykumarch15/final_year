const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const runPlacementPipeline = require("./cron/scheduler");
const leetcodeRoutes = require("./routes/leetcodeRoutes").default || require("./routes/leetcodeRoutes");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const matchRoutes = require("./routes/matchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
runPlacementPipeline();

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/leetcode", leetcodeRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
