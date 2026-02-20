const xlsx = require("xlsx");
const StudentProfile = require("../models/StudentProfile");

const importAcademicData = async () => {
  console.log("📘 Academic data import started");

  const workbook = xlsx.readFile("data/academic_data.xlsx");
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const students = xlsx.utils.sheet_to_json(sheet);

  for (let student of students) {
    await StudentProfile.findOneAndUpdate(
      { rollNo: student.rollNo },
      {
        academicDetails: {
          cgpa: student.cgpa,
          branch: student.branch,
        },
        lastUpdated: new Date(),
      },
      { upsert: true }
    );
  }

  console.log("✅ Academic data import completed");
};

module.exports = importAcademicData;
