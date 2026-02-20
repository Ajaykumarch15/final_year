const Job = require("../models/Job");
const jobData = require("./jobData");

const seedJobsLarge = async () => {
    await Job.deleteMany({});

    const formattedJobs = jobData.map((job) => ({
        ...job,
        description: `We are hiring for ${job.title} at ${job.company}. Candidates should have experience in ${job.skills.join(
            ", "
        )}.`,
        jobType: job.jobType || "internship",
        isActive: true,
    }));

    await Job.insertMany(formattedJobs);

    console.log("✅ 40 Jobs Seeded");
};

module.exports = seedJobsLarge;
