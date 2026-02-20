const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
            index: true,
        },

        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            index: true,
        },

        skillScore: Number,
        cgpaScore: Number,
        branchScore: Number,

        finalScore: {
            type: Number,
            index: true,
        },

        rank: Number,
    },
    { timestamps: true }
);

matchSchema.index({ student: 1, job: 1 }, { unique: true });

module.exports = mongoose.model("Match", matchSchema);
