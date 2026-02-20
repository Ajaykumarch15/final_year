const User = require("../models/User");
const bcrypt = require("bcryptjs");

const studentNames = [
    "Aarav Sharma", "Diya Mehta", "Rohan Iyer", "Sneha Nair", "Kunal Verma",
    "Priya Singh", "Rahul Jain", "Ananya Gupta", "Vikram Rao", "Ishita Kapoor",
    "Arjun Das", "Neha Reddy", "Sahil Khan", "Tanvi Kulkarni", "Mohit Yadav",
    "Pooja Sharma", "Ritesh Kumar", "Simran Kaur", "Harsh Patel", "Megha Bansal",
    "Aditya Roy", "Shruti Shah", "Nikhil Soni", "Yash Thakur", "Riya Choudhary",
    "Deepak Mishra", "Anjali Verma", "Manish Arora", "Low CGPA 1", "Low CGPA 2"
];

const seedUsersLarge = async () => {
    await User.deleteMany({});

    const password = await bcrypt.hash("password123", 10);

    // Admin
    const admin = await User.create({
        name: "System Admin",
        email: "admin@nexthire.com",
        password,
        role: "admin",
    });

    // Staff (3)
    const staffUsers = await User.insertMany([
        {
            name: "Placement Officer 1",
            email: "staff1@nexthire.com",
            password,
            role: "staff",
        },
        {
            name: "Placement Officer 2",
            email: "staff2@nexthire.com",
            password,
            role: "staff",
        },
        {
            name: "Placement Officer 3",
            email: "staff3@nexthire.com",
            password,
            role: "staff",
        },
    ]);

    // Students (30)
    const studentUsers = [];

    for (let i = 0; i < studentNames.length; i++) {
        const user = await User.create({
            name: studentNames[i],
            email: `student${i + 1}@nexthire.com`,
            password,
            role: "student",
        });

        studentUsers.push(user);
    }

    console.log("✅ Users Seeded (Admin + Staff + 30 Students)");

    return {
        admin,
        staffUsers,
        studentUsers,
    };
};

module.exports = seedUsersLarge;
