const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractAcademicData = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  // Step 1: Try direct PDF text extraction
  const pdfData = await pdfParse(dataBuffer);

  if (pdfData.text && pdfData.text.trim().length > 50) {
    return pdfData.text;
  }

  // Step 2: OCR fallback for scanned PDFs
  const ocrResult = await Tesseract.recognize(filePath, "eng");
  return ocrResult.data.text;
};

module.exports = extractAcademicData;
