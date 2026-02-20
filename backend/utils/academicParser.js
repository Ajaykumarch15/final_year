const extractCGPA = (text) => {
  const cgpaMatch = text.match(/CGPA\s*[:\-]?\s*(\d\.\d+)/i);
  if (cgpaMatch) return cgpaMatch[1];

  return null;
};

module.exports = extractCGPA;
