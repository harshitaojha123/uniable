import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Help() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("requests")) || [];

    const newRequest = {
      id: Date.now(),
      title,
      description,
      email: user.email,
      resolved: false,
    };

    localStorage.setItem(
      "requests",
      JSON.stringify([...existing, newRequest])
    );

    setTitle("");
    setDescription("");
    alert("Request submitted successfully!");
  };

  return (
    <div className="p-6 pt-20 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Help & Support</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded"
      >
        <input
          type="text"
          placeholder="Request Title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe your issue or request"
          className="w-full border rounded p-2"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
