import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {

  if (!role) return null; // safety check

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-xl font-bold mb-8">Dashboard</h2>

      {role === "student" && (
        <>
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) =>
              `block mb-4 p-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            My Dashboard
          </NavLink>

          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              `block mb-4 p-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            My Profile
          </NavLink>

          {/*<NavLink
            to="/student/jobs"
            className={({ isActive }) =>
              `block mb-4 p-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            Job Listings
          </NavLink>*/}
        </>
      )}

      {role === "staff" && (
        <>
          <NavLink
            to="/staff/dashboard"
            className={({ isActive }) =>
              `block mb-4 p-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            Staff Dashboard
          </NavLink>
        </>
      )}

      {role === "admin" && (
        <>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block mb-4 p-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        </>
      )}

    </div>
  );
};

export default Sidebar;
