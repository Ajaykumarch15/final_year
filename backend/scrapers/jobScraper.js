const puppeteer = require("puppeteer");
const Job = require("../models/Job");
const path = require("path");

const scrapeJobs = async () => {
  console.log("🔍 Job scraping started");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, "../../job-portal/index.html");
  await page.goto(`file://${filePath}`, { waitUntil: "load" });

  const jobs = await page.evaluate(() => {
    const jobElements = document.querySelectorAll(".job-card");
    const jobList = [];

    jobElements.forEach((job) => {
      jobList.push({
        title: job.querySelector(".job-title")?.innerText,
        company: job.querySelector(".company")?.innerText,
        description: job.querySelector(".description")?.innerText,
        skills: ["JavaScript", "Node.js"], // dummy
        eligibility: "CGPA > 7.0",
      });
    });

    return jobList;
  });

  await Job.insertMany(jobs);
  console.log(`✅ ${jobs.length} jobs scraped & saved`);

  await browser.close();
};

module.exports = scrapeJobs;
