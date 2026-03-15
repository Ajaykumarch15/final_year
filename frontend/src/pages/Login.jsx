import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import logo from "../assets/nexthire-logo.png";
import { FaArrowLeft } from "react-icons/fa";

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
    localStorage.setItem("name", res.data.name);

    if (res.data.role === "admin") navigate("/admin/dashboard");
    else if (res.data.role === "staff") navigate("/staff/dashboard");
    else navigate("/student/dashboard");
  };

  return (

    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 overflow-hidden">


      {/* FLOATING BACKGROUND BLOBS */}

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-40 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"></div>


      {/* BACK TO HOME BUTTON */}

      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-700 font-medium hover:text-blue-600 transition"
      >
        <FaArrowLeft />
        Back to Home
      </motion.button>


      {/* LOGIN CONTAINER */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl p-10 w-[400px]"
      >


        {/* BRANDING */}

        <div className="flex flex-col items-center mb-6">

          <motion.img
            src={logo}
            alt="Next Hire Logo"
            className="h-16 mb-3"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <h1 className="text-3xl font-bold text-slate-800">
            Next Hire
          </h1>

          <p className="text-slate-600 text-sm">
            AI-Driven Placement Platform
          </p>

        </div>


        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition shadow-lg"
          >
            Login
          </motion.button>

        </form>

      </motion.div>

    </div>

  );

};

export default Login;