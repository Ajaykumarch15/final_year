import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";

const ProfilePage = () => {

    const [profile, setProfile] = useState({
        rollNo: "",
        branch: "",
        cgpa: "",
        skills: [],
        codingProfiles: {
            leetcode: { url: "" },
            geeksforgeeks: { url: "" }
        },
        isVerified: false
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        const fetchProfile = async () => {
            try {

                const res = await API.get("/profile/me");

                setProfile({
                    ...res.data,
                    codingProfiles: {
                        leetcode: res.data?.codingProfiles?.leetcode || {},
                        geeksforgeeks: res.data?.codingProfiles?.geeksforgeeks || {}
                    }
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, []);

    const completion =
        (profile.rollNo ? 20 : 0) +
        (profile.branch ? 20 : 0) +
        (profile.cgpa ? 20 : 0) +
        (profile.skills?.length ? 20 : 0) +
        (profile.codingProfiles?.leetcode?.url ? 20 : 0);


    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handleSkillsChange = (e) => {

        const skillsArray =
            e.target.value.split(",").map(s => s.trim());

        setProfile({
            ...profile,
            skills: skillsArray
        });

    };


    const handleSave = async () => {

        try {

            setSaving(true);

            await API.put("/profile/me", profile);

            alert("Profile updated successfully");

        } catch (err) {

            console.error(err);
            alert("Update failed");

        } finally {
            setSaving(false);
        }

    };


    if (loading) {

        return (
            <DashboardLayout>
                <div className="text-center mt-20 text-slate-500">
                    Loading profile...
                </div>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Student Profile
                </h1>


                <div className="bg-white shadow rounded-xl p-8 space-y-8">


                    {/* Academic Information */}

                    <div>

                        <h2 className="text-xl font-semibold mb-4">
                            Academic Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="text-sm font-semibold block mb-1">
                                    Roll Number
                                </label>

                                <input
                                    value={profile.rollNo}
                                    disabled
                                    className="w-full border p-2 rounded bg-slate-100"
                                />

                            </div>


                            <div>

                                <label className="text-sm font-semibold block mb-1">
                                    Branch
                                </label>

                                <input
                                    name="branch"
                                    value={profile.branch}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                            </div>


                            <div>

                                <label className="text-sm font-semibold block mb-1">
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

                        </div>

                    </div>


                    {/* Skills */}

                    <div>

                        {/* Skills Section */}

                        <div>

                            <h2 className="text-xl font-semibold mb-4">
                                Technical Skills
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-3">

                                {profile.skills?.map((skill, index) => (

                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm flex items-center gap-2"
                                    >
                                        {skill}

                                        <button
                                            className="text-red-500"
                                            onClick={() => {
                                                const updatedSkills =
                                                    profile.skills.filter((_, i) => i !== index);

                                                setProfile({
                                                    ...profile,
                                                    skills: updatedSkills
                                                });
                                            }}
                                        >
                                            ✕
                                        </button>

                                    </span>

                                ))}

                            </div>


                            <input
                                type="text"
                                placeholder="Type skill and press Enter"
                                className="w-full border p-2 rounded"
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {

                                        e.preventDefault();

                                        const newSkill = e.target.value.trim().toLowerCase();

                                        if (!newSkill) return;

                                        if (!profile.skills.includes(newSkill)) {

                                            setProfile({
                                                ...profile,
                                                skills: [...profile.skills, newSkill]
                                            });

                                        }

                                        e.target.value = "";

                                    }

                                }}
                            />

                        </div>

                    </div>


                    {/* Coding Profiles */}

                    <div>

                        <h2 className="text-xl font-semibold mb-4">
                            Coding Profiles
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">


                            {/* LeetCode */}

                            <div>

                                <label className="text-sm font-semibold block mb-1">
                                    LeetCode Profile URL
                                </label>

                                <input
                                    type="text"
                                    placeholder="https://leetcode.com/u/username/"
                                    value={profile.codingProfiles?.leetcode?.url || ""}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            codingProfiles: {
                                                ...profile.codingProfiles,
                                                leetcode: {
                                                    ...profile.codingProfiles.leetcode,
                                                    url: e.target.value
                                                }
                                            }
                                        })
                                    }
                                    className="w-full border p-2 rounded"
                                />

                                {profile.codingProfiles?.leetcode?.ranking && (

                                    <p className="text-sm text-slate-500 mt-2">

                                        Ranking:
                                        {profile.codingProfiles.leetcode.ranking}

                                    </p>

                                )}

                            </div>


                            {/* GFG */}

                            <div>

                                <label className="text-sm font-semibold block mb-1">
                                    GeeksforGeeks Profile URL
                                </label>

                                <input
                                    type="text"
                                    placeholder="https://auth.geeksforgeeks.org/user/username"
                                    value={profile.codingProfiles?.geeksforgeeks?.url || ""}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            codingProfiles: {
                                                ...profile.codingProfiles,
                                                geeksforgeeks: {
                                                    ...profile.codingProfiles.geeksforgeeks,
                                                    url: e.target.value
                                                }
                                            }
                                        })
                                    }
                                    className="w-full border p-2 rounded"
                                />

                            </div>


                        </div>

                    </div>


                    {/* Profile Completion */}

                    <div>

                        <h2 className="text-xl font-semibold mb-3">
                            Profile Completion
                        </h2>

                        <div className="h-3 bg-slate-200 rounded">

                            <div
                                className="h-3 bg-green-600 rounded"
                                style={{ width: `${completion}%` }}
                            />

                        </div>

                        <p className="text-sm mt-1">
                            {completion}% Completed
                        </p>

                    </div>


                    {/* Verification */}

                    <div>

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


                    {/* Save */}

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