import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    page: 1,
    limit: 8,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNo: "",
    branch: "",
  });

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", {
        params: filters,
      });

      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 IMPORTANT: Re-fetch whenever filters change
  useEffect(() => {
    fetchUsers();
  }, [filters]);

  /* ================= FORM HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1, // 🔥 reset to first page when filtering
    });
  };

  /* ================= CREATE USER ================= */

  const createUser = async () => {
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
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
        branch: "",
      });

      // 🔥 Force reload first page
      setFilters((prev) => ({
        ...prev,
        page: 1,
      }));

      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  /* ================= DELETE USER ================= */

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/user/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Admin Control Panel
        </h1>

        {/* ================= FILTERS ================= */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="grid md:grid-cols-3 gap-4">

            <input
              name="search"
              placeholder="Search by name..."
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

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Users" value={total} />
          <StatCard
            title="Students"
            value={users.filter((u) => u.role === "student").length}
          />
          <StatCard
            title="Staff"
            value={users.filter((u) => u.role === "staff").length}
          />
          <StatCard
            title="Admins"
            value={users.filter((u) => u.role === "admin").length}
          />
        </div>

        {/* ================= CREATE USER ================= */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-bold mb-4">
            Create New User
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 rounded"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>

            {form.role === "student" && (
              <>
                <input
                  name="rollNo"
                  value={form.rollNo}
                  onChange={handleChange}
                  placeholder="Roll No"
                  className="border p-2 rounded"
                />

                <input
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="Branch"
                  className="border p-2 rounded"
                />
              </>
            )}

          </div>

          <button
            onClick={createUser}
            className="mt-4 bg-slate-900 text-white px-6 py-2 rounded"
          >
            Create User
          </button>
        </div>

        {/* ================= USER LIST ================= */}
        <div className="bg-white rounded-xl shadow">
          {users.map((u) => (
            <div
              key={u._id}
              className="p-4 border-b flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-slate-500">{u.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded bg-slate-200 text-sm">
                  {u.role}
                </span>

                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={filters.page === 1}
            onClick={() =>
              setFilters({
                ...filters,
                page: filters.page - 1,
              })
            }
            className="px-4 py-2 bg-slate-200 rounded"
          >
            Prev
          </button>

          <span className="px-4 py-2">
            Page {filters.page} / {totalPages}
          </span>

          <button
            disabled={filters.page === totalPages}
            onClick={() =>
              setFilters({
                ...filters,
                page: filters.page + 1,
              })
            }
            className="px-4 py-2 bg-slate-200 rounded"
          >
            Next
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
