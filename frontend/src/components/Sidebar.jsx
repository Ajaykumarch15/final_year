import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaUserShield
} from "react-icons/fa";

const Sidebar = ({ role }) => {

  if (!role) return null;

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium
     ${isActive
      ? "bg-blue-600 text-white shadow"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (

    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-xl sticky top-0"
    >

      {/* HEADER */}

      <div className="mb-10">

        <h2 className="text-2xl font-bold tracking-wide">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400 capitalize mt-1">
          {role} panel
        </p>

      </div>



      {/* STUDENT MENU */}

      {role === "student" && (

        <div className="flex flex-col gap-2">

          <NavLink to="/student/dashboard" className={linkStyle}>
            <FaHome />
            My Dashboard
          </NavLink>

          <NavLink to="/student/profile" className={linkStyle}>
            <FaUser />
            My Profile
          </NavLink>

        </div>

      )}



      {/* STAFF MENU */}

      {role === "staff" && (

        <div className="flex flex-col gap-2">

          <NavLink to="/staff/dashboard" className={linkStyle}>
            <FaChartBar />
            Staff Dashboard
          </NavLink>

        </div>

      )}



      {/* ADMIN MENU */}

      {role === "admin" && (

        <div className="flex flex-col gap-2">

          <NavLink to="/admin/dashboard" className={linkStyle}>
            <FaUserShield />
            Admin Dashboard
          </NavLink>
          <NavLink
            to="/admin/upload-cgpa"
            className={({ isActive }) =>
              `block mb-4 p-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            Upload CGPA
          </NavLink>

        </div>

      )}

    </motion.div>

  );

};

export default Sidebar;