import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProfilePage from "./pages/student/ProfilePage"; // ✅ ADD THIS
import UploadCGPA from "./pages/admin/UploadCGPA";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route path="/student/profile" element={<ProfilePage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/upload-cgpa" element={<UploadCGPA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
