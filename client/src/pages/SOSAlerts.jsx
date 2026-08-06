import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Search,
  Clock3,
  CheckCircle2,
  Trash2,
  User,
  Accessibility,
  AlertTriangle,
} from "lucide-react";

export default function SOSAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("sosAlerts")) || [];
    setAlerts(stored);
  }, []);

  const markResolved = (id) => {
    const updated = alerts.map((alert) =>
      alert.id === id
        ? { ...alert, status: "resolved" }
        : alert
    );

    setAlerts(updated);

    localStorage.setItem(
      "sosAlerts",
      JSON.stringify(updated)
    );
  };

  const removeSOS = (id) => {
    const updated = alerts.filter(
      (alert) => alert.id !== id
    );

    setAlerts(updated);

    localStorage.setItem(
      "sosAlerts",
      JSON.stringify(updated)
    );
  };

  const filtered = useMemo(() => {
    return alerts.filter((a) =>
      `${a.email} ${a.reason} ${a.disability}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [alerts, search]);

  const total = alerts.length;
  const pending = alerts.filter(
    (a) => a.status === "pending"
  ).length;
  const resolved = alerts.filter(
    (a) => a.status === "resolved"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white p-10 shadow-2xl">

          <div className="flex items-center gap-5">

            <ShieldAlert size={55} />

            <div>

              <h1 className="text-3xl font-black">
                SOS Alert Center
              </h1>

              <p className="mt-3 text-red-100 text-xl">
                Monitor and respond to emergency accessibility requests.
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <ShieldAlert className="text-red-600" size={34} />

            <h3 className="text-gray-500 mt-4">
              Total Alerts
            </h3>

            <h2 className="text-4xl font-black">
              {total}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <Clock3 className="text-orange-500" size={34} />

            <h3 className="text-gray-500 mt-4">
              Pending
            </h3>

            <h2 className="text-4xl font-black">
              {pending}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7">

            <CheckCircle2
              className="text-green-600"
              size={34}
            />

            <h3 className="text-gray-500 mt-4">
              Resolved
            </h3>

            <h2 className="text-4xl font-black">
              {resolved}
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">

          <Search className="text-gray-400" />

          <input
            className="flex-1 outline-none"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Alerts */}

        <div className="mt-8 space-y-6">

          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 shadow-lg text-center">

              <AlertTriangle
                size={60}
                className="mx-auto text-gray-400"
              />

              <h2 className="text-2xl font-bold mt-5">
                No SOS Alerts
              </h2>

            </div>
          ) : (
            filtered.map((alert) => (
              <motion.div
                key={alert.id}
                whileHover={{ scale: 1.01 }}
                className="rounded-3xl bg-white shadow-xl p-8 border-l-8 border-red-600"
              >

                <div className="flex justify-between flex-wrap gap-6">

                  <div className="space-y-3">

                    <div className="flex items-center gap-3">

                      <User className="text-blue-600" />

                      <span className="font-semibold">
                        {alert.email}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <Accessibility className="text-purple-600" />

                      <span>
                        {alert.disability}
                      </span>

                    </div>

                    <div>

                      <p className="font-semibold">
                        Reason
                      </p>

                      <p className="text-gray-600 mt-1">
                        {alert.reason}
                      </p>

                    </div>

                    <p className="text-sm text-gray-500">
                      {alert.time}
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-4">

                    <span
                      className={`rounded-full px-4 py-2 font-semibold ${
                        alert.status === "pending"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {alert.status.toUpperCase()}
                    </span>

                    {alert.status === "pending" && (
                      <button
                        onClick={() =>
                          markResolved(alert.id)
                        }
                        className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700 transition"
                      >
                        Resolve
                      </button>
                    )}

                    <button
                      onClick={() =>
                        removeSOS(alert.id)
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