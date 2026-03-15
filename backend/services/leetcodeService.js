const axios = require("axios");

function extractUsername(profileUrl) {

  const match = profileUrl.match(/leetcode\.com\/(?:u\/)?([A-Za-z0-9_-]+)\/?/);
  return match ? match[1] : null;

}

async function fetchLeetCodeProfile(username) {

  const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
  `;

  try {

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data.data.matchedUser;

  } catch (err) {

    console.error("LeetCode fetch error:", username);
    return null;

  }

}

module.exports = { extractUsername, fetchLeetCodeProfile };