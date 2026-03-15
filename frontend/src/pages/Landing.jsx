import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import logo from "../assets/nexthire-logo.png";

import {
  FaRobot,
  FaBolt,
  FaUsers,
  FaShieldAlt,
  FaFileAlt,
  FaChartLine,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";


/* ANIMATION VARIANTS */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};


/* LANDING PAGE */

const Landing = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-white flex flex-col overflow-hidden">


      {/* NAVBAR */}

      <div className="flex justify-between items-center px-10 py-6 border-b">

        <div className="flex items-center gap-3">

          <motion.img
            src={logo}
            alt="logo"
            className="h-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <h1 className="text-xl font-bold text-slate-800">
            Next Hire
          </h1>

        </div>

        <div className="flex items-center gap-8 text-slate-600 font-medium">

          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#how" className="hover:text-blue-600 transition">
            How It Works
          </a>

          <a href="#stats" className="hover:text-blue-600 transition">
            Benefits
          </a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            Login
          </motion.button>

        </div>

      </div>


      {/* HERO */}

      <div className="relative py-32 px-6 text-center bg-gradient-to-r from-blue-50 to-indigo-100 overflow-hidden">

        {/* FLOATING SHAPES */}

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="text-5xl font-bold leading-tight mb-6">

            AI-Driven Automated
            <br />

            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Placement Platform
            </span>

          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 text-lg mb-8">

            Next Hire is an intelligent campus placement system
            that automates job ingestion, student profile management,
            and AI powered job matching.

          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-slate-700"
          >
            Get Started →
          </motion.button>

        </motion.div>

      </div>



      {/* FEATURES */}

      <div id="features" className="py-24 px-10 bg-slate-50">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Features for Modern Placement
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <Feature
              icon={<FaRobot />}
              title="AI-Powered Matching"
              desc="Match students with the most suitable job opportunities using AI."
            />

            <Feature
              icon={<FaBolt />}
              title="Automated Job Ingestion"
              desc="Automatically import job postings from multiple sources."
            />

            <Feature
              icon={<FaUsers />}
              title="Student Profiles"
              desc="Manage academic records, skills and achievements."
            />

            <Feature
              icon={<FaShieldAlt />}
              title="Secure Access"
              desc="Role-based access for admins and placement staff."
            />

            <Feature
              icon={<FaFileAlt />}
              title="Resume Processing"
              desc="Extract information from resumes automatically."
            />

            <Feature
              icon={<FaChartLine />}
              title="Analytics Dashboard"
              desc="Visual insights into placement statistics."
            />

          </div>

        </motion.div>

      </div>



      {/* HOW IT WORKS */}

      <div id="how" className="py-24 px-10">

        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-10 text-center"
        >

          <Step number="01" title="Import Jobs" />
          <Step number="02" title="AI Processing" />
          <Step number="03" title="Student Matching" />
          <Step number="04" title="Track Placements" />

        </motion.div>

      </div>



      {/* STATS */}

      <div
        id="stats"
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      >

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-10 text-center max-w-6xl mx-auto"
        >

          <Stat number={95} suffix="%" label="Placement Success Rate" />
          <Stat number={70} suffix="%" label="Time Saved" />
          <Stat number={10000} suffix="+" label="Students Placed" />
          <Stat number={500} suffix="+" label="Partner Companies" />

        </motion.div>

      </div>



      {/* FOOTER */}

      <div className="bg-slate-900 text-slate-300 py-16 px-10">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          <div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Next Hire
            </h3>

            <p className="text-slate-400 mb-6">
              AI driven automated placement platform transforming campus recruitment.
            </p>

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Next Hire
            </p>

          </div>

          <div className="grid grid-cols-2 gap-8">

            <div>

              <h4 className="font-semibold text-white mb-4">
                Product
              </h4>

              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">How it Works</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
              </ul>

            </div>

            <div>

              <h4 className="font-semibold text-white mb-4">
                Company
              </h4>

              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Privacy</li>
              </ul>

            </div>

          </div>

          <div className="flex flex-col items-start md:items-end gap-4">

            <p className="text-slate-400">Follow Us</p>

            <div className="flex gap-4">

              <div className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 cursor-pointer transition">
                <FaTwitter />
              </div>

              <div className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 cursor-pointer transition">
                <FaLinkedin />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};



/* FEATURE CARD */

const Feature = ({ icon, title, desc }) => (

  <motion.div
    variants={item}
    whileHover={{ y: -10 }}
    className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition border border-slate-100"
  >

    <div className="w-14 h-14 flex items-center justify-center rounded-xl text-white text-2xl mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:scale-110 transition">

      {icon}

    </div>

    <h3 className="font-semibold text-lg mb-2 text-slate-800">
      {title}
    </h3>

    <p className="text-slate-600 text-sm leading-relaxed">
      {desc}
    </p>

  </motion.div>

);



/* STEP CARD */

const Step = ({ number, title }) => (

  <motion.div
    variants={item}
    whileHover={{ scale: 1.05 }}
    className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
  >

    <div className="text-blue-600 text-4xl font-bold mb-3">
      {number}
    </div>

    <p className="text-slate-700 font-semibold">
      {title}
    </p>

  </motion.div>

);



/* ANIMATED COUNTER */

const Stat = ({ number, suffix, label }) => {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let start = 0;
    const duration = 1500;
    const increment = number / (duration / 16);

    const timer = setInterval(() => {

      start += increment;

      if (start >= number) {
        start = number;
        clearInterval(timer);
      }

      setCount(Math.floor(start));

    }, 16);

    return () => clearInterval(timer);

  }, [number]);

  return (

    <motion.div
      variants={item}
      whileHover={{ scale: 1.08 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
    >

      <h3 className="text-4xl font-bold">
        {count}{suffix}
      </h3>

      <p className="mt-2 text-sm">
        {label}
      </p>

    </motion.div>

  );

};


export default Landing;