import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accessibility from "./pages/Accessibility";
import Help from "./pages/Help";
import CampusAccessibility from "./pages/CampusAccessibility";
import Ai from "./pages/Ai";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCampus from "./pages/AdminCampus";
import SOSAlerts from "./pages/SOSAlerts";

/* ---------------- Protected Routes ---------------- */

function StudentRoute({ children }) {
  const { user, role } = useAuth();

  if (!user || role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { user, role } = useAuth();

  if (!user || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* ---------------- App ---------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24">
        <Routes>

          {/* ---------- Public ---------- */}

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ---------- Student ---------- */}

          <Route
            path="/dash"
            element={
              <StudentRoute>
                <Dashboard />
              </StudentRoute>
            }
          />

          <Route
            path="/access"
            element={
              <StudentRoute>
                <Accessibility />
              </StudentRoute>
            }
          />

          <Route
            path="/help"
            element={
              <StudentRoute>
                <Help />
              </StudentRoute>
            }
          />

          <Route
            path="/campus"
            element={
              <StudentRoute>
                <CampusAccessibility />
              </StudentRoute>
            }
          />

          <Route
            path="/ai"
            element={
              <StudentRoute>
                <Ai />
              </StudentRoute>
            }
          />

          {/* ---------- Admin ---------- */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/campus"
            element={
              <AdminRoute>
                <AdminCampus />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/sos-alerts"
            element={
              <AdminRoute>
                <SOSAlerts />
              </AdminRoute>
            }
          />

          {/* ---------- Fallback ---------- */}

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>
    </div>
  );
}