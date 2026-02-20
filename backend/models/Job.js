const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    minCGPA: {
      type: Number,
      default: 0,
    },

    eligibleBranches: [
      {
        type: String,
        trim: true,
      },
    ],

    jobType: {
      type: String,
      enum: ["internship", "full-time"],
      default: "internship",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
