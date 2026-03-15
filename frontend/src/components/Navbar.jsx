import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBars
} from "react-icons/fa";

import logo from "../assets/nexthire-logo.png";

const Navbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full backdrop-blur-lg bg-slate-900/90 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50"
    >

      {/* LEFT SECTION */}

      <div className="flex items-center gap-4">

        {/* HAMBURGER */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="text-xl hover:text-blue-400"
        >
          <FaBars />
        </motion.button>


        {/* LOGO */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >

          <motion.img
            src={logo}
            alt="Next Hire Logo"
            className="h-10"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <span className="text-xl font-bold tracking-wide">
            Next Hire
          </span>

        </motion.div>

      </div>



      {/* RIGHT SECTION */}

      <div className="flex items-center gap-6">

        {/* USER INFO */}

        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full text-sm">

          <FaUserCircle className="text-blue-400" />

          <span className="capitalize">
            {name || role}
          </span>

        </div>



        {/* LOGOUT */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
        >

          <FaSignOutAlt />

          Logout

        </motion.button>

      </div>

    </motion.div>

  );

};

export default Navbar;