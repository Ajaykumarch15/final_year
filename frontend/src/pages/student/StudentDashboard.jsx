import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get("/profile/me");
        setProfile(profileRes.data);

        const matchRes = await API.get("/match/me");

        // Make sure matches is always array
        setMatches(Array.isArray(matchRes.data) ? matchRes.data : []);

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);   // ✅ IMPORTANT
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-10 text-slate-600">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Student Dashboard
        </h1>

        {profile && (
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Profile Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p><span className="font-semibold">Roll No:</span> {profile.rollNo}</p>
              <p><span className="font-semibold">Branch:</span> {profile.branch}</p>
              <p><span className="font-semibold">CGPA:</span> {profile.cgpa}</p>
              <p><span className="font-semibold">Skills:</span> {profile.skills?.join(", ")}</p>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6">
          Top Recommended Jobs
        </h2>

        {matches.length === 0 ? (
          <div className="text-slate-500">
            No eligible matches found.
          </div>
        ) : (
          matches.map((match) => (
            <div key={match._id} className="bg-white rounded-xl shadow p-6 mb-6">

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">
                    {match.job?.title}
                  </h3>
                  <p className="text-slate-600">
                    {match.job?.company}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Type: {match.job?.jobType}
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">
                  Rank #{match.rank}
                </span>
              </div>

              <div className="mb-4">
                <div className="h-2 bg-slate-200 rounded">
                  <div
                    className="h-2 bg-green-600 rounded"
                    style={{ width: `${match.finalScore}%` }}
                  />
                </div>
                <p className="text-sm mt-1 font-semibold">
                  Final Score: {match.finalScore.toFixed(1)}%
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                <p>Skill Score: {match.skillScore.toFixed(1)}%</p>
                <p>CGPA Score: {match.cgpaScore.toFixed(1)}%</p>
                <p>Branch Score: {match.branchScore.toFixed(1)}%</p>
              </div>

              <div className="text-sm text-slate-600 border-t pt-3">
                <p>Minimum CGPA Required: {match.job?.minCGPA}</p>
                <p>Required Skills: {match.job?.skills?.join(", ")}</p>

                {match.job?.eligibleBranches?.length > 0 && (
                  <p>
                    Eligible Branches: {match.job.eligibleBranches.join(", ")}
                  </p>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
