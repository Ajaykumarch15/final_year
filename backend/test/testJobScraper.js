const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://ajaykumarch15.github.io/jobscrapetest/";

async function testScraper() {
    try {

        console.log("Fetching jobs...");

        const response = await axios.get(URL);

        const html = response.data;

        const $ = cheerio.load(html);

        const jobs = [];

        $(".job-card").each((index, element) => {

            const title = $(element).find(".job-title").text().trim();
            const company = $(element).find(".company").text().trim();
            const skills = $(element).find(".skills").text().trim();
            const description = $(element).find(".description").text().trim();

            jobs.push({
                title,
                company,
                skills: skills.split(","),
                description
            });

        });

        console.log("Jobs extracted:\n");

        console.log(JSON.stringify(jobs, null, 2));

    } catch (error) {

        console.error("Scraper error:", error);

    }
}

testScraper();