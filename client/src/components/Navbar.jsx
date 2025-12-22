import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 



  return (
    <nav className=" sticky top-0 z-50 flex items-center justify-between bg-[#2f3639] px-6 py-3 text-white">
      <Link to="/" className="text-xl font-bold">
        UniAble
      </Link>

      <div className="flex items-center gap-6">
        {/* PUBLIC */}
        {!isAuthenticated && (
          <Link to="/login" >
           <button  className=" bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-100 transition">Login</button>
          </Link>
        )}

        {/* STUDENT */}
        {isAuthenticated && role === "student" && (
          <>
            <Link to="/dash">Dashboard</Link>
            <Link to="/access">Accessibility</Link>
            <Link to="/help">Help</Link>
            <Link to="/ai">AI Assistant</Link>
            <Link to="/campus">Campus Map</Link>


          </>
        )}

        {user?.role === "admin" && (
  <Link
    to="/admin/sos-alerts"
    className="text-red-600 font-semibold"
  >
    SOS Alerts
  </Link>
)}

        {/* ADMIN */}
        {isAuthenticated && role === "admin" && (
          <Link to="/admin">Admin Dashboard</Link>
        )}

        {/* PROFILE */}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              className="h-8 w-8 rounded-full"
              alt="avatar"
            />
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-3 py-1 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
