import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/profile/me");
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSkillsChange = (e) => {
        const skillsArray = e.target.value.split(",").map((s) => s.trim());
        setProfile({ ...profile, skills: skillsArray });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await API.put("/profile/me", profile);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-slate-800 mb-8">
                    Edit Profile
                </h1>

                <div className="bg-white p-8 rounded-xl shadow space-y-6">

                    {/* Roll No */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Roll Number
                        </label>
                        <input
                            name="rollNo"
                            value={profile.rollNo}
                            disabled
                            className="w-full border p-2 rounded bg-slate-100"
                        />
                    </div>

                    {/* Branch */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Branch
                        </label>
                        <input
                            name="branch"
                            value={profile.branch}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* CGPA */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            CGPA
                        </label>
                        <input
                            name="cgpa"
                            type="number"
                            step="0.01"
                            value={profile.cgpa}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Skills (comma separated)
                        </label>
                        <input
                            value={profile.skills?.join(", ")}
                            onChange={handleSkillsChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Coding Profiles */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <h2 className="font-semibold mb-2">LeetCode</h2>
                            <input
                                type="number"
                                value={profile.codingProfiles?.leetcode?.problemsSolved}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        codingProfiles: {
                                            ...profile.codingProfiles,
                                            leetcode: {
                                                ...profile.codingProfiles.leetcode,
                                                problemsSolved: e.target.value,
                                            },
                                        },
                                    })
                                }
                                className="w-full border p-2 rounded mb-2"
                                placeholder="Problems Solved"
                            />

                            <input
                                type="number"
                                value={profile.codingProfiles?.leetcode?.rating}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        codingProfiles: {
                                            ...profile.codingProfiles,
                                            leetcode: {
                                                ...profile.codingProfiles.leetcode,
                                                rating: e.target.value,
                                            },
                                        },
                                    })
                                }
                                className="w-full border p-2 rounded"
                                placeholder="Rating"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold mb-2">GeeksforGeeks</h2>
                            <input
                                type="number"
                                value={profile.codingProfiles?.geeksforgeeks?.problemsSolved}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        codingProfiles: {
                                            ...profile.codingProfiles,
                                            geeksforgeeks: {
                                                ...profile.codingProfiles.geeksforgeeks,
                                                problemsSolved: e.target.value,
                                            },
                                        },
                                    })
                                }
                                className="w-full border p-2 rounded mb-2"
                                placeholder="Problems Solved"
                            />

                            <input
                                type="number"
                                value={profile.codingProfiles?.geeksforgeeks?.score}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        codingProfiles: {
                                            ...profile.codingProfiles,
                                            geeksforgeeks: {
                                                ...profile.codingProfiles.geeksforgeeks,
                                                score: e.target.value,
                                            },
                                        },
                                    })
                                }
                                className="w-full border p-2 rounded"
                                placeholder="Score"
                            />
                        </div>
                    </div>

                    {/* Verified */}
                    <div className="mt-4">
                        <span className="font-semibold">
                            Verification Status:
                        </span>{" "}
                        {profile.isVerified ? (
                            <span className="text-green-600 font-semibold">
                                Verified
                            </span>
                        ) : (
                            <span className="text-red-600 font-semibold">
                                Not Verified
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-700"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;
