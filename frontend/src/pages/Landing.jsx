import { useNavigate } from "react-router-dom";
import logo from "../assets/nexthire-logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col">
      
      {/* Top Section */}
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Next Hire Logo" className="h-12" />
          <h1 className="text-2xl font-bold text-slate-800">
            Next Hire
          </h1>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-slate-800 text-white px-5 py-2 rounded hover:bg-teal-600 transition"
        >
          Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          AI-Driven Automated Placement Platform
        </h2>

        <p className="text-slate-700 max-w-2xl mb-8">
          Next Hire is an intelligent campus placement system that automates
          job ingestion, student profile management, and role-based access
          for administrators, staff, and students.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-slate-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-slate-600 text-sm">
        © {new Date().getFullYear()} Next Hire — All Rights Reserved
      </div>
    </div>
  );
};

export default Landing;
