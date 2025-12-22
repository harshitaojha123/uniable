import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin validation (temporary hardcoded)
    if (role === "admin") {
      if (email !== "admin@12gmail.com" || password !== "admin123") {
        alert("Invalid admin credentials");
        return;
      }
    }

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      email
    )}&background=random`;

    // Save login info
    login({
      email,
      role,
      avatar,
    });

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dash");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-2xl font-bold text-center">
          Login to UniAble
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-3 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="mb-4 flex gap-6 justify-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
