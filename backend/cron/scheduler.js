const cron = require("node-cron");
const scrapeJobs = require("../scrapers/jobScraper");
const enrichProfiles = require("../pipelines/profileEnrichment");
const importAcademicData = require("../pipelines/academicDataImport");

const startScheduler = () => {
  cron.schedule("0 12 * * *", async () => {
    console.log("⏰ Cron Job Started");

    await scrapeJobs();          // Iteration 2 – Step 2
    await enrichProfiles();     // Iteration 2 – Step 3
    await importAcademicData(); // Iteration 2 – Step 4

    console.log("✅ Cron Job Completed");
  });
};

module.exports = startScheduler;
