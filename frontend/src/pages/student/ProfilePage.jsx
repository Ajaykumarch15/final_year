import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";

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

    const [editMode, setEditMode] = useState(false);

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

    const handleSave = async () => {

        try {

            setSaving(true);

            await API.put("/profile/me", profile);

            alert("Profile updated successfully");

            setEditMode(false);

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

    const leetcodeExists = profile.codingProfiles?.leetcode?.url;

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-10">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Student Profile
                        </h1>

                        <p className="text-slate-500">
                            Manage your academic and coding profile
                        </p>

                    </div>

                    {!editMode && (

                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>

                    )}

                </div>



                {/* PROFILE COMPLETION */}

                <div className="bg-white shadow rounded-xl p-6 mb-10">

                    <div className="flex justify-between mb-2">

                        <h2 className="font-semibold">
                            Profile Completion
                        </h2>

                        <span className="font-semibold">
                            {completion}%
                        </span>

                    </div>

                    <div className="h-3 bg-slate-200 rounded">

                        <div
                            className="h-3 bg-green-500 rounded"
                            style={{ width: `${completion}%` }}
                        />

                    </div>

                </div>



                <div className="grid md:grid-cols-2 gap-8">

                    {/* ACADEMIC CARD */}

                    <motion.div
                        whileHover={{ y: -3 }}
                        className="bg-white shadow rounded-xl p-6"
                    >

                        <h2 className="text-xl font-semibold mb-4">
                            Academic Information
                        </h2>

                        <div className="space-y-4">

                            <div>

                                <label className="text-sm font-semibold">
                                    Roll Number
                                </label>

                                <input
                                    value={profile.rollNo}
                                    disabled
                                    className="w-full border p-2 rounded bg-slate-100"
                                />

                            </div>


                            <div>

                                <label className="text-sm font-semibold">
                                    Branch
                                </label>

                                <input
                                    name="branch"
                                    value={profile.branch}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    className="w-full border p-2 rounded"
                                />

                            </div>


                            <div>

                                <label className="text-sm font-semibold">
                                    CGPA
                                </label>

                                <input
                                    name="cgpa"
                                    type="number"
                                    step="0.01"
                                    value={profile.cgpa}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    className="w-full border p-2 rounded"
                                />

                            </div>

                        </div>

                    </motion.div>



                    {/* CODING PROFILES */}

                    <motion.div
                        whileHover={{ y: -3 }}
                        className="bg-white shadow rounded-xl p-6"
                    >

                        <h2 className="text-xl font-semibold mb-4">
                            Coding Profiles
                        </h2>

                        <div className="space-y-4">

                            {/* LEETCODE */}

                            <div>

                                <label className="text-sm font-semibold">
                                    LeetCode URL
                                </label>

                                <input
                                    value={profile.codingProfiles?.leetcode?.url || ""}
                                    disabled={!editMode || leetcodeExists}
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

                                {leetcodeExists && (
                                    <p className="text-xs text-red-500 mt-1">
                                        LeetCode URL can only be added once.
                                    </p>
                                )}

                                {profile.codingProfiles?.leetcode?.ranking && (

                                    <p className="text-sm text-slate-500 mt-1">
                                        Ranking: {profile.codingProfiles.leetcode.ranking}
                                    </p>

                                )}

                            </div>


                            {/* GFG */}

                            <div>

                                <label className="text-sm font-semibold">
                                    GeeksforGeeks URL
                                </label>

                                <input
                                    value={profile.codingProfiles?.geeksforgeeks?.url || ""}
                                    disabled={!editMode}
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

                    </motion.div>

                </div>



                {/* SKILLS */}

                <div className="bg-white shadow rounded-xl p-6 mt-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Technical Skills
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-4">

                        {profile.skills?.map((skill, index) => (

                            <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >

                                {skill}

                                {editMode && (

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

                                )}

                            </span>

                        ))}

                    </div>


                    {editMode && (

                        <input
                            placeholder="Add skill and press Enter"
                            className="w-full border p-2 rounded"
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    e.preventDefault();

                                    const skill = e.target.value.trim().toLowerCase();

                                    if (!skill) return;

                                    if (!profile.skills.includes(skill)) {

                                        setProfile({
                                            ...profile,
                                            skills: [...profile.skills, skill]
                                        });

                                    }

                                    e.target.value = "";

                                }

                            }}
                        />

                    )}

                </div>



                {/* VERIFICATION */}

                <div className="mt-8 flex justify-between items-center">

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


                    {editMode && (

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-700"
                        >

                            {saving ? "Saving..." : "Save Changes"}

                        </button>

                    )}

                </div>

            </div>

        </DashboardLayout>

    );

};

export default ProfilePage;