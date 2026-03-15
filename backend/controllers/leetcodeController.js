import { fetchLeetCodeProfile } from "../services/leetcodeService.js";
import StudentProfile from "../models/StudentProfile.js";

export const syncLeetCode = async (req, res) => {

    const { profileUrl } = req.body;

    const match = profileUrl.match(/leetcode\.com\/(?:u\/)?([A-Za-z0-9_-]+)/);
    const username = match ? match[1] : null;

    if (!username)
        return res.status(400).json({ error: "Invalid LeetCode URL" });

    const data = await fetchLeetCodeProfile(username);

    if (!data)
        return res.status(404).json({ error: "LeetCode user not found" });

    const stats = data.submitStats.acSubmissionNum;

    const easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find(s => s.difficulty === "Hard")?.count || 0;

    const profile = await StudentProfile.findOneAndUpdate(
        { user: req.user.id },
        {
            leetcode: {
                username: data.username,
                ranking: data.profile.ranking,
                reputation: data.profile.reputation,
                solvedEasy: easy,
                solvedMedium: medium,
                solvedHard: hard
            }
        },
        { new: true }
    );

    res.json(profile);
};