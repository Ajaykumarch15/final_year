const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");

// Sample data
const branches = ["CSE", "CSD", "ECE", "EEE"];
const skillsPool = [
    "React", "Node", "MongoDB", "Python", "Java",
    "Machine Learning", "Data Structures", "SQL",
    "AWS", "Docker"
];

// Random helpers
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomSkills = () => {
    const count = Math.floor(Math.random() * 5) + 2; // 2–6 skills
    return [...new Set(Array.from({ length: count }, () => getRandom(skillsPool)))];
};

async function seedStudents(count = 500) {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    for (let i = 1; i <= count; i++) {

        const rollNo = `AUTO${1000 + i}`;
        const email = `${rollNo.toLowerCase()}@nexthire.com`;

        const exists = await User.findOne({ email });
        if (exists) {
            console.log(`Skipping ${rollNo}`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(rollNo, 10);

        const user = await User.create({
            name: `Student ${i}`,
            email,
            password: hashedPassword,
            role: "student"
        });

        await StudentProfile.create({
            user: user._id,
            rollNo,
            branch: getRandom(branches),
            cgpa: (Math.random() * 4 + 6).toFixed(2), // 6.0 – 10.0
            skills: getRandomSkills()
        });

        if (i % 50 === 0) {
            console.log(`✅ Created ${i} students`);
        }
    }

    console.log("🎯 500 Students Created Successfully");

    process.exit();
}

seedStudents(500);