import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Shield,
  LogIn,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") {
      if (
        email !== "admin@12gmail.com" ||
        password !== "admin123"
      ) {
        alert("Invalid admin credentials");
        return;
      }
    }

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      email
    )}&background=4f46e5&color=fff`;

    login({
      email,
      role,
      avatar,
    });

    navigate(role === "admin" ? "/admin" : "/dash");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-6 py-20">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="grid lg:grid-cols-2 max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl bg-white"
      >

        {/* Left Side */}

        <div className="hidden lg:flex bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-14 flex-col justify-center">

          <h1 className="text-5xl font-black leading-tight">
            Welcome to
            <br />
            UniAble
          </h1>

          <p className="mt-8 text-lg text-blue-100 leading-8">
            Making every campus more accessible through technology,
            AI assistance and inclusive infrastructure.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              ✅ AI Accessibility Assistant
            </div>

            <div className="flex items-center gap-3">
              ✅ Campus Navigation
            </div>

            <div className="flex items-center gap-3">
              ✅ SOS Emergency Support
            </div>

            <div className="flex items-center gap-3">
              ✅ Accessibility Requests
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-14">

          <div className="text-center mb-10">

            <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl shadow-xl">
              ♿
            </div>

            <h2 className="text-4xl font-black mt-6">
              Sign In
            </h2>

            <p className="text-gray-500 mt-2">
              Continue to your UniAble account
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="font-semibold mb-2 block">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold mb-2 block">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-gray-300 pl-12 pr-12 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Role */}

            <div>

              <label className="font-semibold block mb-3">
                Login As
              </label>

              <div className="grid grid-cols-2 gap-4">

                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`rounded-xl border p-4 transition ${
                    role === "student"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <GraduationCap className="mx-auto mb-2" />

                  Student

                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`rounded-xl border p-4 transition ${
                    role === "admin"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Shield className="mx-auto mb-2" />

                  Admin

                </button>

              </div>

            </div>

            {/* Login Button */}

            <button
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-white font-bold hover:scale-[1.02] transition flex items-center justify-center gap-3 shadow-xl"
            >
              <LogIn size={20} />

              Login

            </button>

          </form>

        </div>

      </motion.div>

    </div>
  );
}