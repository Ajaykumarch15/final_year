import { useNavigate } from "react-router-dom";
import logo from "../assets/nexthire-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow">
      
      {/* Logo + Title (Clickable) */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Next Hire Logo"
          className="h-10"
        />
        <span className="text-xl font-bold">
          Next Hire
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <span className="text-sm capitalize">
          Role: <b>{role}</b>
        </span>

        <button
          onClick={handleLogout}
          className="bg-teal-600 px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
