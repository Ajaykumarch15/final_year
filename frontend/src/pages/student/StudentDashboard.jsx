import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

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
        setMatches(Array.isArray(matchRes.data) ? matchRes.data : []);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, []);

  if (loading) {

    return (
      <DashboardLayout>
        <div className="text-center mt-20 text-slate-500">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );

  }

  if (!profile) {

    return (
      <DashboardLayout>
        <div className="text-center mt-20">
          Profile not found
        </div>
      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Student Dashboard
        </h1>


        {/* SUMMARY CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <p className="text-sm text-slate-500">CGPA</p>
            <p className="text-2xl font-bold">{profile.cgpa}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <p className="text-sm text-slate-500">Skills</p>
            <p className="text-2xl font-bold">
              {profile.skills?.length || 0}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <p className="text-sm text-slate-500">LeetCode Ranking</p>
            <p className="text-2xl font-bold">
              {profile?.codingProfiles?.leetcode?.ranking || "N/A"}
            </p>
          </div>

        </div>


        {/* PROFILE OVERVIEW */}

        <div className="bg-white shadow rounded-xl p-6 mb-10">

          <h2 className="text-xl font-semibold mb-4">
            Profile Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">

            <p><b>Roll No:</b> {profile.rollNo}</p>
            <p><b>Branch:</b> {profile.branch}</p>
            <p><b>CGPA:</b> {profile.cgpa}</p>
            <p><b>Skills:</b> {profile.skills?.join(", ")}</p>

          </div>

        </div>


        {/* CODING PERFORMANCE */}

        {profile?.codingProfiles?.leetcode?.ranking && (

          <div className="bg-white shadow rounded-xl p-6 mb-10">

            <h2 className="text-xl font-semibold mb-6">
              Coding Performance
            </h2>

            <div className="grid md:grid-cols-4 gap-6 text-center">

              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-slate-500">Easy</p>
                <p className="text-xl font-bold">
                  {profile.codingProfiles.leetcode.solvedEasy}
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded">
                <p className="text-sm text-slate-500">Medium</p>
                <p className="text-xl font-bold">
                  {profile.codingProfiles.leetcode.solvedMedium}
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded">
                <p className="text-sm text-slate-500">Hard</p>
                <p className="text-xl font-bold">
                  {profile.codingProfiles.leetcode.solvedHard}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-slate-500">Ranking</p>
                <p className="text-xl font-bold">
                  {profile.codingProfiles.leetcode.ranking}
                </p>
              </div>

            </div>

          </div>

        )}




        {/* AI JOB RECOMMENDATIONS */}

        <h2 className="text-2xl font-semibold mb-6">
          AI Recommended Jobs
        </h2>


        {matches.length === 0 ? (

          <div className="text-slate-500">
            No matches found yet.
          </div>

        ) : (

          matches.map(match => (

            <div
              key={match._id}
              className="bg-white shadow rounded-xl p-6 mb-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-lg font-bold">
                    {match.job?.title}
                  </h3>

                  <p className="text-slate-600">
                    {match.job?.company}
                  </p>

                  <p className="text-sm text-slate-500">
                    {match.job?.jobType}
                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">
                  Rank #{match.rank}
                </span>

              </div>



              {/* MATCH SCORE BAR */}

              <div className="mt-4">

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


              {/* MATCH EXPLANATION */}

              <div className="grid md:grid-cols-3 gap-4 text-sm mt-4">

                <p>
                  Skill Match:
                  <span className="font-semibold">
                    {" "} {match.skillScore?.toFixed(1)}%
                  </span>
                </p>

                <p>
                  CGPA Match:
                  <span className="font-semibold">
                    {" "} {match.cgpaScore?.toFixed(1)}%
                  </span>
                </p>

                <p>
                  Branch Match:
                  <span className="font-semibold">
                    {" "} {match.branchScore?.toFixed(1)}%
                  </span>
                </p>

              </div>


              {/* JOB DETAILS */}

              <div className="text-sm text-slate-600 border-t pt-3 mt-3">

                <p>
                  Minimum CGPA Required:
                  {" "} {match.job?.minCGPA}
                </p>

                <p>
                  Required Skills:
                  {" "} {match.job?.skills?.join(", ")}
                </p>

              </div>

            </div>

          ))

        )}


      </div>

    </DashboardLayout>

  );

};

export default StudentDashboard;