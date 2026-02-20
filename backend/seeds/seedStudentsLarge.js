const StudentProfile = require("../models/StudentProfile");
const studentData = require("./studentData");

const seedStudentsLarge = async (studentUsers) => {
    await StudentProfile.deleteMany({});

    if (studentUsers.length !== studentData.length) {
        throw new Error(
            `Mismatch: studentUsers=${studentUsers.length}, studentData=${studentData.length}`
        );
    }

    const profiles = studentUsers.map((user, i) => ({
        user: user._id,
        rollNo: `NH2025${1000 + i}`,
        branch: studentData[i].branch,
        cgpa: studentData[i].cgpa,
        skills: studentData[i].skills,
        isVerified: true,
    }));

    await StudentProfile.insertMany(profiles);

    console.log("✅ 30 Student Profiles Seeded");
};

module.exports = seedStudentsLarge;
