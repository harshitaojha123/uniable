import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  LifeBuoy,
  Send,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Help() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
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
      createdAt: new Date().toLocaleString(),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 shadow-2xl"
        >
          <div className="flex items-center gap-5">

            <div className="rounded-2xl bg-white/20 p-4">
              <LifeBuoy size={36} />
            </div>

            <div>

              <h1 className="text-4xl font-black">
                Help & Support
              </h1>

              <p className="mt-3 text-lg text-blue-100">
                Submit accessibility issues or support requests.
                Our administration team will review them promptly.
              </p>

            </div>

          </div>
        </motion.div>

        {/* Form */}

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
        >

          <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
            <FileText className="text-blue-600" />
            Submit a Request
          </h2>

          <div className="space-y-6">

            <div>

              <label className="font-semibold block mb-2">
                Request Title
              </label>

              <input
                type="text"
                placeholder="Example: Wheelchair Ramp Maintenance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />

            </div>

            <div>

              <label className="font-semibold block mb-2">
                Describe Your Issue
              </label>

              <textarea
                rows={6}
                placeholder="Explain your accessibility issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />

            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold hover:scale-105 transition shadow-lg"
            >
              <Send size={20} />
              Submit Request
            </button>

          </div>

        </motion.form>

        {/* Info Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="rounded-2xl bg-white shadow-lg p-6">

            <CheckCircle2
              className="text-green-600 mb-4"
              size={30}
            />

            <h3 className="font-bold text-lg">
              Quick Response
            </h3>

            <p className="text-gray-500 mt-2">
              Requests are reviewed by the administration as soon as possible.
            </p>

          </div>

          <div className="rounded-2xl bg-white shadow-lg p-6">

            <LifeBuoy
              className="text-blue-600 mb-4"
              size={30}
            />

            <h3 className="font-bold text-lg">
              Accessibility Support
            </h3>

            <p className="text-gray-500 mt-2">
              Ask for campus assistance, accessibility improvements,
              or academic support.
            </p>

          </div>

          <div className="rounded-2xl bg-white shadow-lg p-6">

            <Send
              className="text-purple-600 mb-4"
              size={30}
            />

            <h3 className="font-bold text-lg">
              Track Requests
            </h3>

            <p className="text-gray-500 mt-2">
              Administrators can review, resolve, and update your requests.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}