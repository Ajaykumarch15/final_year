const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const Job = require("../models/Job");

const URL = "https://ajaykumarch15.github.io/jobscrapetest/";

async function scrapeJobs() {
  try {

    console.log("🔎 Starting job scraper...");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto(URL, {
      waitUntil: "networkidle2",
      timeout: 0
    });

    const html = await page.content();

    const $ = cheerio.load(html);

    const jobs = [];

    $(".job-card").each((index, element) => {

      const title = $(element).find(".job-title").text().trim();
      const company = $(element).find(".company").text().trim();
      const description = $(element).find(".description").text().trim();

      const skillsText = $(element).find(".skills").text().trim();

      const skills = skillsText
        .split(",")
        .map(skill => skill.trim());

      const job = {
        title,
        company,
        description,
        skills,
        minCGPA: 6,
        eligibleBranches: ["CSE", "IT", "ECE"],
        isActive: true
      };

      jobs.push(job);

    });

    await browser.close();

    console.log(`📦 ${jobs.length} jobs scraped`);

    // Save jobs in MongoDB
    for (const job of jobs) {

      await Job.findOneAndUpdate(
        {
          title: job.title,
          company: job.company
        },
        job,
        {
          upsert: true,
          new: true
        }
      );

    }

    console.log("✅ Jobs stored in database");

  } catch (error) {

    console.error("❌ Job scraper error:", error);

  }
}

module.exports = scrapeJobs;