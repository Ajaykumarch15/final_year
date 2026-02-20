const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    branch: {
      type: String,
      required: true,
    },

    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    skills: {
      type: [String],
      default: [],
    },

    codingProfiles: {
      leetcode: {
        problemsSolved: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
      },
      geeksforgeeks: {
        problemsSolved: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
