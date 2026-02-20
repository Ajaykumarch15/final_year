const StudentProfile = require("../models/StudentProfile");
const {
  fetchLeetCodeData,
  fetchGFGData,
} = require("../services/codingService");

const enrichProfiles = async () => {
  console.log("👤 Profile enrichment started");

  const profiles = await StudentProfile.find();

  for (let profile of profiles) {
    const leetcode = await fetchLeetCodeData("dummyUser");
    const gfg = await fetchGFGData("dummyUser");

    profile.codingProfiles = {
      leetcode,
      geeksforgeeks: gfg,
    };

    profile.lastUpdated = new Date();
    await profile.save();
  }

  console.log("✅ Profile enrichment completed");
};

module.exports = enrichProfiles;
