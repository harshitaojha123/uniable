import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accessibility from "./pages/Accessibility";
import Help from "./pages/Help";
import AdminDashboard from "./pages/AdminDashboard";
import CampusAccessibility from "./pages/CampusAccessibility";
import AdminCampus from "./pages/AdminCampus";
import Ai from "./pages/Ai";
import SOSAlerts from "./pages/SOSAlerts";





export default function App() {
  const { user, role } = useAuth();
  function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}


  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* STUDENT */}
        <Route
          path="/dash"
          element={
            user && role === "student" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
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


        <Route
          path="/access"
          element={
            user && role === "student" ? (
              <Accessibility />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/help"
          element={
            user && role === "student" ? (
              <Help />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/campus"
          element={
            user && role === "student" ? (
              <CampusAccessibility />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            user && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/campus"
          element={
            user && role === "admin" ? (
              <AdminCampus />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

        <Route
  path="/ai"
  element={
    user && role === "student" ? (
      <Ai />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

<Route
  path="/campus"
  element={
    user && role === "student" ? (
      <CampusAccessibility />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
      </Routes>
    </>
  );
}
