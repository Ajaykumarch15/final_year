require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
};

const seedAdmin = async () => {
    try {
        await connectDB();

        // Delete existing admin (optional)
        await User.deleteOne({ email: "admin@college.com" });

        const admin = await User.create({
            name: "Super Admin",
            email: "admin@college.com",
            password: "admin123", // will be hashed automatically
            role: "admin",
        });

        console.log("Admin created:", admin.email);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
