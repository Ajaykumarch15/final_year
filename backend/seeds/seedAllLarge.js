require("dotenv").config();
const connectDB = require("../config/db");
const Match = require("../models/Match");

const seedUsersLarge = require("./seedUsersLarge");
const seedStudentsLarge = require("./seedStudentsLarge");
const seedJobsLarge = require("./seedJobsLarge");

const runSeed = async () => {
    try {
        await connectDB();

        console.log("🧹 Resetting database...");

        await Match.deleteMany({});

        const { studentUsers } = await seedUsersLarge();

        await seedStudentsLarge(studentUsers);

        await seedJobsLarge();

        console.log("🎉 Large Dataset Seed Completed Successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

runSeed();
