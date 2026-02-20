import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

const StaffDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    branch: "",
    minCgpa: "",
    minScore: "",
    skill: "",
    search: "",
  });

  // 🔹 Load initial analytics + overview
  useEffect(() => {
    const loadData = async () => {
      try {
        const analyticsRes = await API.get("/match/analytics");
        const overviewRes = await API.get("/match/overview");

        setAnalytics(analyticsRes.data);
        setOverview(Array.isArray(overviewRes.data) ? overviewRes.data : []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔹 Apply Filters
  const fetchOverview = async () => {
    try {
      const res = await API.get("/match/overview", {
        params: filters,
      });

      setOverview(res.data.data || []);

    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  // 🔹 Export CSV with filters
  const exportData = async (format) => {
    try {
      const res = await API.get("/match/export", {
        params: { ...filters, format },
        responseType: "blob",
      });

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        format === "pdf" ? "students_report.pdf" : "students_report.csv"
      );
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };
  // download button 
  const downloadPDF = async () => {
    try {
      const response = await API.get("/match/export-pdf", {
        params: filters,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "NextHire_Report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("PDF error:", err);
    }
  };



  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-10 text-slate-600">
          Loading Staff Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Placement Analytics Dashboard
        </h1>

        {/* SUMMARY CARDS */}
        {analytics && (
          <div className="grid md:grid-cols-5 gap-6 mb-10">
            <Card title="Students" value={analytics.totalStudents} />
            <Card title="Matches" value={analytics.totalMatches} />
            <Card title="Avg Score" value={`${analytics.avgScore.toFixed(1)}%`} />
            <Card title="High Performers" value={analytics.highPerformers} />
            <Card title="Jobs" value={analytics.jobsCount} />
          </div>
        )}

        {/* CHARTS */}
        {analytics && (
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-4">Students by Branch</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.branchDistribution}>
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-4">Score Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.scoreBuckets}
                    dataKey="count"
                    nameKey="_id"
                    outerRadius={100}
                  >
                    {analytics.scoreBuckets.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

        )}



        {/* RECRUITER CONSTRAINT PANEL */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Recruiter Constraints
          </h2>

          <div className="grid md:grid-cols-5 gap-4">

            <input
              placeholder="Search student..."
              className="border p-2 rounded"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <select
              className="border p-2 rounded"
              onChange={(e) =>
                setFilters({ ...filters, branch: e.target.value })
              }
            >
              <option value="">All Branches</option>
              <option value="Computer Science">Computer Science</option>
              <option value="IT">IT</option>
              <option value="Mechanical">Mechanical</option>
            </select>

            <input
              type="number"
              placeholder="Min CGPA"
              className="border p-2 rounded"
              onChange={(e) =>
                setFilters({ ...filters, minCgpa: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Min Final Score"
              className="border p-2 rounded"
              onChange={(e) =>
                setFilters({ ...filters, minScore: e.target.value })
              }
            />

            <input
              placeholder="Required Skill (react)"
              className="border p-2 rounded"
              onChange={(e) =>
                setFilters({ ...filters, skill: e.target.value })
              }
            />
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={fetchOverview}
              className="bg-slate-800 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>

            <button
              onClick={() => exportData("csv")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Export CSV
            </button>

            <button
              onClick={() => exportData("pdf")}
              className="bg-green-600 text-white px-4 py-2 rounded ml-3"
            >
              Export PDF
            </button>
            <button
              onClick={downloadPDF}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Download PDF Report
            </button>


          </div>


        </div>

        {/* STUDENT OVERVIEW LIST */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h2 className="font-semibold">
              Filtered Student Overview
            </h2>
          </div>

          {overview.length === 0 ? (
            <div className="p-6 text-slate-500">
              No students match the current filters.
            </div>
          ) : (
            overview.map((s) => (
              <div
                key={s.studentId}
                className="p-6 border-b flex justify-between hover:bg-slate-50"
              >
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-slate-600">
                    Branch: {s.branch} | CGPA: {s.cgpa}
                  </p>
                  <p className="text-sm">
                    Total Matches: {s.totalMatches}
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">
                  Best: {s.bestScore.toFixed(1)}%
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <p className="text-slate-500 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default StaffDashboard;
