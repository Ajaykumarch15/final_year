require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const seedUsers = require("./seedUsers");
const seedStudents = require("./seedStudents");
const seedJobs = require("./seedJobs");

const runSeed = async () => {
    try {
        await connectDB();

        console.log("🧹 Clearing Match Collection...");
        const Match = require("../models/Match");
        await Match.deleteMany({});

        const users = await seedUsers();
        await seedStudents(users);
        await seedJobs();

        console.log("🎉 Database Reset & Seed Completed");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

runSeed();
