const StudentProfile = require("../models/StudentProfile");
const Job = require("../models/Job");
const Match = require("../models/Match");

const isEligible = require("./eligibility");
const {
    calculateSkillScore,
    calculateCGPAScore,
    calculateBranchScore,
    calculateFinalScore,
} = require("./scoring");

const rankMatches = require("./ranking");

const runMatchingEngine = async () => {
    console.log("🚀 Running Matching Engine...");

    await Match.deleteMany({});

    const students = await StudentProfile.find({});
    const jobs = await Job.find({});


    for (const student of students) {
        let studentMatches = [];

        for (const job of jobs) {
            if (!isEligible(student, job)) continue;

            const skillScore = calculateSkillScore(
                student.skills,
                job.skills
            );

            const cgpaScore = calculateCGPAScore(student.cgpa);

            const branchScore = calculateBranchScore(
                student.branch,
                job.eligibleBranches
            );

            const finalScore = calculateFinalScore(
                skillScore,
                cgpaScore,
                branchScore
            );

            studentMatches.push({
                student: student._id,
                job: job._id,
                skillScore,
                cgpaScore,
                branchScore,
                finalScore,
            });
        }

        const rankedMatches = rankMatches(studentMatches);

        await Match.insertMany(rankedMatches);
    }

    console.log("✅ Matching Completed Successfully");
};

module.exports = runMatchingEngine;
