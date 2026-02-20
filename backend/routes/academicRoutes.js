const express = require("express");
const upload = require("../config/upload");
const extractAcademicData = require("../services/ocrService");
const extractCGPA = require("../utils/academicParser");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const text = await extractAcademicData(req.file.path);
    const cgpa = extractCGPA(text);

    res.json({
      message: "Academic document processed",
      cgpa,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
