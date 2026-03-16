import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";

import {
  FaUsers,
  FaUserGraduate,
  FaUserTie,
  FaUserShield,
  FaTrash
} from "react-icons/fa";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // for analytics
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    page: 1,
    limit: 8
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNo: "",
    branch: ""
  });

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {

    try {

      const res = await API.get("/admin/users", {
        params: filters
      });

      setUsers(res.data.users);
      setTotal(res.data.total);

      // fetch all users for analytics
      const allRes = await API.get("/admin/users", {
        params: { limit: 1000 }
      });

      setAllUsers(allRes.data.users);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1
    });
  };

  /* ================= CREATE USER ================= */

  const createUser = async () => {

    try {

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      };

      if (form.role === "student") {
        payload.rollNo = form.rollNo;
        payload.branch = form.branch;
      }

      await API.post("/admin/create-user", payload);

      alert("User created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "student",
        rollNo: "",
        branch: ""
      });

      fetchUsers();

    } catch (err) {

      alert(err.response?.data?.message || "Error creating user");

    }

  };

  /* ================= DELETE USER ================= */

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await API.delete(`/admin/user/${id}`);
      fetchUsers();

    } catch {
      alert("Delete failed");
    }

  };

  const totalPages = Math.ceil(total / filters.limit);

  /* ================= CORRECT COUNTS ================= */

  const studentCount = allUsers.filter(u => u.role === "student").length;
  const staffCount = allUsers.filter(u => u.role === "staff").length;
  const adminCount = allUsers.filter(u => u.role === "admin").length;

  /* ================= CHART ================= */

  const chartData = {
    labels: ["Students", "Staff", "Admins"],
    datasets: [
      {
        label: "Users",
        data: [studentCount, staffCount, adminCount],
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B"
        ],
        borderWidth: 0
      }
    ]
  };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Admin Control Panel
        </h1>

        {/* ================= STATS ================= */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <StatCard icon={<FaUsers />} title="Total Users" value={total} color="bg-blue-500" />

          <StatCard icon={<FaUserGraduate />} title="Students" value={studentCount} color="bg-green-500" />

          <StatCard icon={<FaUserTie />} title="Staff" value={staffCount} color="bg-purple-500" />

          <StatCard icon={<FaUserShield />} title="Admins" value={adminCount} color="bg-yellow-500" />

        </div>

        {/* ================= ANALYTICS ================= */}

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-4">
              User Distribution
            </h2>

            <div className="h-72">

              <Pie
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top"
                    }
                  }
                }}
              />

            </div>

          </div>

        </div>


        {/* ================= CREATE USER ================= */}

        <div className="bg-white p-6 rounded-xl shadow mb-10">

          <h2 className="text-xl font-bold mb-4">
            Create User
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />

            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />

            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" />

            <select name="role" value={form.role} onChange={handleChange} className="border p-2 rounded">

              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>

            </select>

            {form.role === "student" && (

              <>
                <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll No" className="border p-2 rounded" />
                <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" className="border p-2 rounded" />
              </>

            )}

          </div>

          <button
            onClick={createUser}
            className="mt-4 bg-slate-900 text-white px-6 py-2 rounded hover:bg-slate-700"
          >
            Create User
          </button>

        </div>


        {/* ================= FILTERS ================= */}

        <div className="bg-white p-6 rounded-xl shadow mb-10">

          <h2 className="font-semibold mb-4">
            Filters
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="search"
              placeholder="Search user..."
              value={filters.search}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            />

            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >

              <option value="">All Roles</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>

            </select>

          </div>

        </div>


        {/* ================= USER TABLE ================= */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {users.map(u => (

            <motion.div
              key={u._id}
              whileHover={{ backgroundColor: "#f8fafc" }}
              className="p-4 border-b flex justify-between items-center"
            >

              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-slate-500">{u.email}</p>
              </div>

              <div className="flex items-center gap-4">

                <span className={`px-3 py-1 rounded text-sm
                  ${u.role === "admin" && "bg-red-100 text-red-600"}
                  ${u.role === "staff" && "bg-blue-100 text-blue-600"}
                  ${u.role === "student" && "bg-green-100 text-green-600"}
                `}>
                  {u.role}
                </span>

                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>

              </div>

            </motion.div>

          ))}

        </div>


        {/* ================= PAGINATION ================= */}

        <div className="flex justify-center gap-4 mt-6">

          <button
            disabled={filters.page === 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            className="px-4 py-2 bg-slate-200 rounded"
          >
            Prev
          </button>

          <span>
            Page {filters.page} / {totalPages}
          </span>

          <button
            disabled={filters.page === totalPages}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            className="px-4 py-2 bg-slate-200 rounded"
          >
            Next
          </button>

        </div>

      </div>

    </DashboardLayout>

  );

};

const StatCard = ({ icon, title, value, color }) => (

  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-xl shadow flex items-center gap-4"
  >

    <div className={`${color} text-white p-3 rounded-lg`}>
      {icon}
    </div>

    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>

  </motion.div>

);

export default AdminDashboard;