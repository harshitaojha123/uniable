import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Trash2,
  Search,
  ShieldAlert,
} from "lucide-react";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("requests")) || [];

    setRequests(stored);
  }, []);

  const sosAlerts =
    JSON.parse(localStorage.getItem("sosAlerts")) || [];

  const toggleResolved = (id) => {
    const updated = requests.map((req) =>
      req.id === id
        ? { ...req, resolved: !req.resolved }
        : req
    );

    setRequests(updated);
    localStorage.setItem(
      "requests",
      JSON.stringify(updated)
    );
  };

  const removeRequest = (id) => {
    const updated = requests.filter(
      (req) => req.id !== id
    );

    setRequests(updated);

    localStorage.setItem(
      "requests",
      JSON.stringify(updated)
    );
  };

  const filtered = useMemo(() => {
    return requests.filter((r) =>
      `${r.title} ${r.description} ${r.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [requests, search]);

  const total = requests.length;

  const pending = requests.filter(
    (r) => !r.resolved
  ).length;

  const resolved = requests.filter(
    (r) => r.resolved
  ).length;

  const stats = [
    {
      title: "Total Requests",
      value: total,
      icon: ClipboardList,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "SOS Alerts",
      value: sosAlerts.length,
      icon: ShieldAlert,
      color: "from-red-600 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white p-10 shadow-2xl">

          <h1 className="text-3xl font-black">
            Admin Dashboard
          </h1>

          <p className="mt-4 text-slate-300 text-xl">
            Monitor accessibility requests, SOS alerts,
            and student support activities.
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl shadow-lg p-7"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-gray-500 mt-5">
                  {item.title}
                </h3>

                <h2 className="text-4xl font-black mt-2">
                  {item.value}
                </h2>

              </motion.div>
            );
          })}

        </div>

        {/* Search */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">

          <Search className="text-gray-400" />

          <input
            className="flex-1 outline-none"
            placeholder="Search requests..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Requests */}

        <div className="mt-8 space-y-6">

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 shadow-lg text-center">

              <AlertTriangle
                size={55}
                className="mx-auto text-gray-400"
              />

              <h2 className="text-2xl font-bold mt-5">
                No Requests Found
              </h2>

            </div>
          ) : (
            filtered.map((req) => (
              <motion.div
                key={req.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-3xl shadow-lg p-7"
              >

                <div className="flex justify-between gap-6 flex-wrap">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {req.title}
                    </h2>

                    <p className="mt-3 text-gray-600">
                      {req.description}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                      Requested by:
                      <span className="font-semibold ml-2">
                        {req.email}
                      </span>
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-4">

                    <button
                      onClick={() =>
                        toggleResolved(req.id)
                      }
                      className={`rounded-full px-5 py-2 font-semibold ${
                        req.resolved
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {req.resolved
                        ? "Resolved"
                        : "Pending"}
                    </button>

                    <button
                      onClick={() =>
                        removeRequest(req.id)
                      }
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700 transition"
                    >
                      <Trash2 size={18} />

                      Remove

                    </button>

                  </div>

                </div>

              </motion.div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}