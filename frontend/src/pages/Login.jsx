import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/nexthire-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("userId", res.data.userId);

    if (res.data.role === "admin") navigate("/admin/dashboard");
    else if (res.data.role === "staff") navigate("/staff/dashboard");
    else navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center">

      {/* Branding */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={logo}
          alt="Next Hire Logo"
          className="h-16 mb-2"
        />
        <h1 className="text-3xl font-bold text-slate-800">
          Next Hire
        </h1>
        <p className="text-slate-600 text-sm">
          AI-Driven Placement Platform
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-stone-100 p-8 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-xl font-semibold text-center text-slate-800 mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-teal-600 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded focus:ring-2 focus:ring-teal-600 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
