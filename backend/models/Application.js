const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        status: {
            type: String,
            enum: ["applied", "shortlisted", "rejected"],
            default: "applied",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
