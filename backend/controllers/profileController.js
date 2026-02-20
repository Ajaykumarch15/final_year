const StudentProfile = require("../models/StudentProfile");

/*
  GET LOGGED IN STUDENT PROFILE
*/
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      user: req.user.id,
    }).populate("user", "name email role");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*
  UPDATE PROFILE (Student Only)
*/
exports.updateMyProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const {
      rollNo,
      branch,
      cgpa,
      skills,
      codingProfiles,
    } = req.body;

    // Validation
    if (cgpa && (cgpa < 0 || cgpa > 10)) {
      return res.status(400).json({ message: "Invalid CGPA" });
    }

    profile.rollNo = rollNo ?? profile.rollNo;
    profile.branch = branch ?? profile.branch;
    profile.cgpa = cgpa ?? profile.cgpa;

    if (skills) {
      profile.skills = skills;
    }

    if (codingProfiles) {
      profile.codingProfiles = codingProfiles;
    }

    await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
