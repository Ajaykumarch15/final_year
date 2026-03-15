import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";

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

import {
  FaGraduationCap,
  FaCode,
  FaTrophy,
  FaBriefcase
} from "react-icons/fa";

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

  const bestMatch = matches[0];

  /* PIE CHART */

  const pieData = bestMatch ? {
    labels: ["Skill Match", "CGPA Match", "Branch Match"],
    datasets: [{
      data: [
        bestMatch.skillScore || 0,
        bestMatch.cgpaScore || 0,
        bestMatch.branchScore || 0
      ],
      backgroundColor: [
        "#3B82F6",
        "#22C55E",
        "#F59E0B"
      ],
      borderWidth: 0
    }]
  } : null;

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" }
    }
  };

  /* BAR CHART */

  const codingStats = profile?.codingProfiles?.leetcode;

  const barData = codingStats ? {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [{
      label: "Solved Problems",
      data: [
        codingStats.solvedEasy,
        codingStats.solvedMedium,
        codingStats.solvedHard
      ],
      backgroundColor: [
        "#22C55E",
        "#F59E0B",
        "#EF4444"
      ],
      borderRadius: 6
    }]
  } : null;

  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-3xl font-bold">
            Welcome back 👋
          </h1>

          <p className="text-slate-500">
            Here are your latest placement insights
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <StatCard icon={<FaGraduationCap />} label="CGPA" value={profile.cgpa} color="bg-blue-500" />

          <StatCard icon={<FaCode />} label="Skills" value={profile.skills?.length || 0} color="bg-green-500" />

          <StatCard icon={<FaTrophy />} label="LeetCode Rank" value={profile?.codingProfiles?.leetcode?.ranking || "N/A"} color="bg-yellow-500" />

          <StatCard icon={<FaBriefcase />} label="Matches" value={matches.length} color="bg-purple-500" />

        </div>

        {/* ANALYTICS */}

        {bestMatch && (

          <div className="grid lg:grid-cols-2 gap-8 mb-12">

            <div className="bg-white shadow rounded-xl p-6">

              <h2 className="text-lg font-semibold mb-4">
                Match Score Breakdown
              </h2>

              <div className="h-72">
                <Pie data={pieData} options={pieOptions} />
              </div>

            </div>

            {barData && (

              <div className="bg-white shadow rounded-xl p-6">

                <h2 className="text-lg font-semibold mb-4">
                  Coding Performance
                </h2>

                <div className="h-72">
                  <Bar data={barData} options={barOptions} />
                </div>

              </div>

            )}

          </div>

        )}

        {/* PROFILE */}

        <div className="bg-white shadow rounded-xl p-6 mb-12">

          <h2 className="text-xl font-semibold mb-4">
            Profile Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">

            <p><b>Roll No:</b> {profile.rollNo}</p>
            <p><b>Branch:</b> {profile.branch}</p>
            <p><b>CGPA:</b> {profile.cgpa}</p>

            <div>
              <b>Skills:</b>

              <div className="flex flex-wrap gap-2 mt-2">

                {profile.skills?.map(skill => (

                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          </div>

        </div>

        {/* BEST MATCH */}

        {bestMatch && (

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 mb-12 shadow-lg">

            <h2 className="text-2xl font-bold mb-2">
              ⭐ Best AI Match
            </h2>

            <h3 className="text-xl font-semibold">
              {bestMatch.job?.title}
            </h3>

            <p className="text-blue-100">
              {bestMatch.job?.company}
            </p>

            <div className="mt-4">

              <div className="bg-white/30 h-3 rounded">

                <div
                  className="bg-white h-3 rounded"
                  style={{ width: `${bestMatch.finalScore}%` }}
                />

              </div>

              <p className="mt-2 text-sm">
                Match Score: {bestMatch.finalScore.toFixed(1)}%
              </p>

            </div>

          </div>

        )}

        {/* JOBS */}

        <h2 className="text-2xl font-semibold mb-6">
          AI Recommended Jobs
        </h2>

        {matches.length === 0 ? (

          <div className="text-slate-500">
            No matches found yet.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {matches.map(match => (
              <JobCard key={match._id} match={match} />
            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

};

/* STAT CARD */

const StatCard = ({ icon, label, value, color }) => (

  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white shadow rounded-xl p-6 flex items-center gap-4"
  >

    <div className={`${color} text-white p-3 rounded-lg text-xl`}>
      {icon}
    </div>

    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>

  </motion.div>

);

/* JOB CARD */

const JobCard = ({ match }) => (

  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white shadow rounded-xl p-6"
  >

    <div className="flex justify-between">

      <div>

        <h3 className="font-bold text-lg">
          {match.job?.title}
        </h3>

        <p className="text-slate-500">
          {match.job?.company}
        </p>

      </div>

      <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
        Rank #{match.rank}
      </span>

    </div>

    <div className="mt-4">

      <div className="bg-slate-200 h-2 rounded">

        <div
          className="bg-green-600 h-2 rounded"
          style={{ width: `${match.finalScore}%` }}
        />

      </div>

      <p className="text-sm mt-1 font-semibold">
        {match.finalScore.toFixed(1)}% Match
      </p>

    </div>

  </motion.div>

);

export default StudentDashboard;