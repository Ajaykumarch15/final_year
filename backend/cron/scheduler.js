const cron = require("node-cron");
const axios = require("axios");

const StudentProfile = require("../models/StudentProfile");
const Job = require("../models/Job");
const Match = require("../models/Match");

const scrapeJobs = require("../scrapers/jobScraper");
const { sendJobMatchEmail } = require("../services/emailService");
const { extractUsername, fetchLeetCodeProfile } =
  require("../services/leetcodeService");
async function syncLeetCodeProfiles(students) {

  const tasks = students.map(async (student) => {

    const url = student.codingProfiles?.leetcode?.url;

    if (!url) return;

    const username = extractUsername(url);

    if (!username) return;

    const data = await fetchLeetCodeProfile(username);

    if (!data) return;

    const stats = data.submitStats.acSubmissionNum;

    const easy =
      stats.find(s => s.difficulty === "Easy")?.count || 0;

    const medium =
      stats.find(s => s.difficulty === "Medium")?.count || 0;

    const hard =
      stats.find(s => s.difficulty === "Hard")?.count || 0;

    await StudentProfile.updateOne(

      { _id: student._id },

      {
        $set: {
          "codingProfiles.leetcode.username": username,
          "codingProfiles.leetcode.ranking": data.profile.ranking,
          "codingProfiles.leetcode.reputation": data.profile.reputation,
          "codingProfiles.leetcode.solvedEasy": easy,
          "codingProfiles.leetcode.solvedMedium": medium,
          "codingProfiles.leetcode.solvedHard": hard
        }
      }

    );

  });

  await Promise.all(tasks);

  console.log("✅ LeetCode profiles synced");

}
async function runPlacementPipeline() {

  try {

    console.log("🚀 Placement pipeline started:", new Date());

    // STEP 1 — Scrape jobs
    await scrapeJobs();
    console.log("✅ Job scraping completed");

    // STEP 2 — Fetch students
    const students = await StudentProfile.find().populate("user", "email name");
    const jobs = await Job.find({ isActive: true });

    // STEP 3 — Sync LeetCode
    await syncLeetCodeProfiles(students);

    console.log(`📊 Students: ${students.length}, Jobs: ${jobs.length}`);

    // STEP 3 — Run AI matching
    for (const student of students) {

      const payload = {
        student: {
          skills: student.skills,
          cgpa: student.cgpa,
          branch: student.branch
        },
        jobs: jobs.map(job => ({
          id: job._id,
          description: job.description,
          minCGPA: job.minCGPA,
          eligibleBranches: job.eligibleBranches
        }))
      };

      const aiResponse = await axios.post(
        "http://localhost:8000/match",
        payload
      );

      const matches = aiResponse.data.matches;

      // Remove previous matches
      await Match.deleteMany({ student: student._id });

      // Save new matches
      for (let i = 0; i < matches.length; i++) {

        const m = matches[i];

        if (!m.jobId) continue;

        await Match.create({
          student: student._id,
          job: m.jobId,
          skillScore: m.skillScore,
          cgpaScore: m.cgpaScore,
          branchScore: m.branchScore,
          finalScore: m.finalScore,
          rank: m.rank || i + 1
        });

      }

      console.log(`🎯 Matches updated for student ${student._id}`);
      await sendJobMatchEmail(student.user.email, matches);
    }

    console.log("✅ Placement pipeline finished");

  } catch (error) {

    console.error("❌ Pipeline Error:", error);

  }

}

// Run every day at 12 PM
cron.schedule("0 12 * * *", () => {
  runPlacementPipeline();
});

module.exports = runPlacementPipeline;