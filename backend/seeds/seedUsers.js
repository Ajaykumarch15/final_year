const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedUsers = async () => {
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
        {
            name: "Admin User",
            email: "admin@nexthire.com",
            password: hashedPassword,
            role: "admin",
        },
        {
            name: "Staff User",
            email: "staff@nexthire.com",
            password: hashedPassword,
            role: "staff",
        },
        {
            name: "Priya Sharma",
            email: "priya@nexthire.com",
            password: hashedPassword,
            role: "student",
        },
        {
            name: "Rahul Verma",
            email: "rahul@nexthire.com",
            password: hashedPassword,
            role: "student",
        },
    ]);

    console.log("✅ Users Seeded");
    return users;
};

module.exports = seedUsers;
