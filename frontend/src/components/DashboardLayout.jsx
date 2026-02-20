import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const role = localStorage.getItem("role"); // 🔥 Get role here

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar role={role} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
