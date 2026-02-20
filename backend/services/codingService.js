const fetchLeetCodeData = async (username) => {
  // Dummy simulated data
  return {
    problemsSolved: Math.floor(Math.random() * 300),
    rating: 1200 + Math.floor(Math.random() * 400),
  };
};

const fetchGFGData = async (username) => {
  return {
    problemsSolved: Math.floor(Math.random() * 200),
    score: 500 + Math.floor(Math.random() * 300),
  };
};

module.exports = {
  fetchLeetCodeData,
  fetchGFGData,
};
