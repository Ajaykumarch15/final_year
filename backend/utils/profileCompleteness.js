const calculateProfileCompleteness = (profile) => {
  let score = 0;

  if (profile.academicDetails?.cgpa) score += 10;
  if (profile.academicDetails?.branch) score += 10;
  if (profile.rollNo) score += 10;

  if (profile.skills && profile.skills.length > 0) score += 20;

  if (profile.codingProfiles?.leetcode?.problemsSolved > 0) score += 10;
  if (profile.codingProfiles?.geeksforgeeks?.problemsSolved > 0) score += 10;

  if (profile.links?.linkedin) score += 10;
  if (profile.links?.github) score += 10;

  if (profile.summary && profile.summary.length > 20) score += 10;

  return score;
};

module.exports = calculateProfileCompleteness;
