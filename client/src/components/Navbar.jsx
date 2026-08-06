import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Accessibility,
  LayoutDashboard,
  Map,
  Bot,
  HelpCircle,
  ShieldAlert,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold text-blue-600"
        >
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg">
            ♿
          </div>

          <span>UniAble</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg transition hover:scale-105"
            >
              Login
            </Link>
          )}

          {isAuthenticated && role === "student" && (
            <>
              <NavLink to="/dash" className={navStyle}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <NavLink to="/access" className={navStyle}>
                <Accessibility size={18} />
                Accessibility
              </NavLink>

              <NavLink to="/campus" className={navStyle}>
                <Map size={18} />
                Campus
              </NavLink>

              <NavLink to="/ai" className={navStyle}>
                <Bot size={18} />
                AI Assistant
              </NavLink>

              <NavLink to="/help" className={navStyle}>
                <HelpCircle size={18} />
                Help
              </NavLink>
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <>
              <NavLink to="/admin" className={navStyle}>
                <LayoutDashboard size={18} />
                Admin
              </NavLink>

              <NavLink to="/admin/sos-alerts" className={navStyle}>
                <ShieldAlert size={18} />
                SOS Alerts
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-4 ml-5 border-l border-gray-300 pl-5">
              <img
                src={user.avatar}
                alt="avatar"
                className="h-11 w-11 rounded-full border-2 border-blue-500 shadow-md"
              />

              <div className="hidden lg:block">
                <h3 className="font-semibold text-gray-800">
                  {user.name || "User"}
                </h3>

                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white font-semibold transition hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}