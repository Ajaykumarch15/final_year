import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {

  const role = localStorage.getItem("role");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}

      <div
        className={`fixed z-40 transition-all duration-300 
        ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}
      >
        <Sidebar role={role} />
      </div>



      {/* RIGHT SIDE */}

      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >

        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;