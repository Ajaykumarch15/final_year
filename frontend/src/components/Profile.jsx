import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/CS001") // sample rollNo
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Student Profile</h2>
      <p>CGPA: {profile.academicDetails.cgpa}</p>
      <p>Branch: {profile.academicDetails.branch}</p>

      <h3 className="mt-3 font-semibold">Coding Stats</h3>
      <p>LeetCode: {profile.codingProfiles.leetcode.problemsSolved} solved</p>
      <p>GFG: {profile.codingProfiles.geeksforgeeks.problemsSolved} solved</p>
    </div>
  );
}

export default Profile;
