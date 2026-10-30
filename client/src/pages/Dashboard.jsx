
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accessibility,
  Bot,
  MapPinned,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Activity,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useAccessibility } from "../context/AccessibilityContext";

const readStorage = (key, fallback = []) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const getStatus = (item) =>
  String(item?.status || "").toLowerCase().trim();

const isResolved = (item) =>
  ["resolved", "completed", "closed", "approved"].includes(
    getStatus(item)
  );

const isPending = (item) =>
  ["pending", "open", "in progress", "in-progress"].includes(
    getStatus(item)
  );

const getTime = (item) => {
  const raw = item?.createdAt || item?.timestamp || item?.time;

  if (!raw) return 0;

  const parsed = new Date(raw).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getDescription = (item) =>
  item?.description ||
  item?.reason ||
  item?.message ||
  item?.title ||
  item?.place ||
  item?.name ||
  "Activity recorded";

const getLabel = (item, type) => {
  if (type === "sos") return "SOS alert submitted";
  if (type === "location") return "Campus accessibility report";
  return "Accessibility request submitted";
};

const belongsToUser = (item, email) => {
  if (!email) return true;

  const recordEmail = item?.email || item?.userEmail;

  // Include records without an email because older saved records
  // may not contain user information.
  if (!recordEmail) return true;

  return recordEmail.toLowerCase() === email.toLowerCase();
};

const statDefinitions = [
  {
    key: "requests",
    title: "Accessibility Requests",
    icon: Accessibility,
    color: "from-blue-500 to-cyan-500",
  },
  {
    key: "resolved",
    title: "Resolved",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-500",
  },
  {
    key: "pending",
    title: "Pending",
    icon: Clock3,
    color: "from-orange-500 to-red-500",
  },
  {
    key: "ai",
    title: "AI Assistance",
    icon: Bot,
    color: "from-purple-500 to-indigo-500",
  },
];

const actions = [
  {
    title: "Accessibility",
    desc: "Manage your accessibility settings.",
    icon: Accessibility,
    link: "/access",
  },
  {
    title: "Campus Map",
    desc: "Explore accessible campus locations.",
    icon: MapPinned,
    link: "/campus",
  },
  {
    title: "AI Assistant",
    desc: "Get help from the accessibility assistant.",
    icon: Bot,
    link: "/ai",
  },
  {
    title: "Emergency Help",
    desc: "Open the available support options.",
    icon: ShieldAlert,
    link: "/help",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { disability } = useAccessibility();

  const [data, setData] = useState({
    requests: [],
    alerts: [],
    locations: [],
    aiActivities: [],
  });

  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const loadDashboard = () => {
      const email = user?.email;

      const requests = readStorage("requests").filter((item) =>
        belongsToUser(item, email)
      );

      const alerts = readStorage("sosAlerts").filter((item) =>
        belongsToUser(item, email)
      );

      const locations = readStorage("campusLocations").filter((item) =>
        belongsToUser(item, email)
      );

      // AI activity is counted only if the application actually
      // saves a chat history under this key.
      const aiActivities = readStorage("aiHistory").filter((item) =>
        belongsToUser(item, email)
      );

      setData({
        requests,
        alerts,
        locations,
        aiActivities,
      });

      setLastUpdated(new Date());
    };

    loadDashboard();

    // Refresh when localStorage changes in another tab.
    window.addEventListener("storage", loadDashboard);

    // Allow other components to request a refresh after saving data.
    window.addEventListener("uniable-data-updated", loadDashboard);

    return () => {
      window.removeEventListener("storage", loadDashboard);
      window.removeEventListener(
        "uniable-data-updated",
        loadDashboard
      );
    };
  }, [user?.email]);

  const resolvedCount = data.requests.filter(isResolved).length;

  const pendingCount = data.requests.filter(isPending).length;

  const totalRequests = data.requests.length;

  const stats = {
    requests: totalRequests,
    resolved: resolvedCount,
    pending: pendingCount,
    ai: data.aiActivities.length,
  };

  const recentActivity = [
    ...data.requests.map((item) => ({
      id: `request-${item.id}`,
      type: "request",
      title: getLabel(item, "request"),
      description: getDescription(item),
      status: item.status || "Submitted",
      time: getTime(item),
      color: "border-blue-500",
    })),

    ...data.alerts.map((item) => ({
      id: `sos-${item.id}`,
      type: "sos",
      title: getLabel(item, "sos"),
      description: getDescription(item),
      status: item.status || "Submitted",
      time: getTime(item),
      color: "border-red-500",
    })),

    ...data.locations.map((item) => ({
      id: `location-${item.id}`,
      type: "location",
      title: getLabel(item, "location"),
      description: getDescription(item),
      status: item.resolved ? "Resolved" : "Reported",
      time: getTime(item),
      color: "border-indigo-500",
    })),
  ]
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);

  const setupComplete = Boolean(disability);

  const refreshDashboard = () => {
    window.dispatchEvent(new Event("uniable-data-updated"));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl sm:p-10"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-medium text-blue-200">
                Student Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                Welcome Back
                {user?.name ? `, ${user.name}` : ""}
              </h1>

              <p className="mt-5 text-lg leading-8 text-blue-100">
                Manage your accessibility settings, explore campus
                facilities, get AI assistance, and review your
                saved requests from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={refreshDashboard}
              className="flex items-center gap-2 rounded-xl border border-white/40 px-4 py-3 font-semibold transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
          </div>

          {lastUpdated && (
            <p className="mt-6 text-sm text-blue-200">
              Last refreshed: {lastUpdated.toLocaleTimeString()}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/access"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:scale-105"
            >
              Accessibility
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/ai"
              className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-blue-700"
            >
              AI Assistant
            </Link>
          </div>
        </motion.section>

        {/* Live Statistics */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
              Your Activity Overview
            </h2>

            <p className="mt-2 text-gray-600">
              Counts are calculated from the records currently saved
              for your account in this browser.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statDefinitions.map((item, index) => {
              const Icon = item.icon;
              const value = stats[item.key];

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl bg-white p-6 shadow-lg"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white`}
                  >
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-4xl font-black text-gray-900">
                    {value}
                  </h3>

                  <p className="mt-2 font-medium text-gray-500">
                    {item.title}
                  </p>

                  {item.key === "ai" && (
                    <p className="mt-2 text-xs text-gray-400">
                      Saved AI history only
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="mb-6 text-2xl font-black text-gray-900 sm:text-3xl">
            Quick Actions
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {actions.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link key={item.link} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -6 }}
                    className="h-full rounded-3xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl sm:p-8"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Icon size={27} />
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-6 text-gray-500">
                      {item.desc}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700">
                      Open
                      <ArrowRight size={17} />
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Accessibility Setup and Recent Activity */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Accessibility Setup */}
          <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Accessibility className="text-blue-600" />
              Accessibility Setup
            </h2>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    Accessibility profile
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {disability
                      ? `Selected: ${disability.charAt(0).toUpperCase()}${disability.slice(1)}`
                      : "No disability preference selected"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    setupComplete
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {setupComplete ? "Configured" : "Not configured"}
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    setupComplete ? "w-full bg-green-500" : "w-0"
                  }`}
                />
              </div>
            </div>

            <Link
              to="/access"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
            >
              Manage accessibility settings
              <ArrowRight size={18} />
            </Link>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              This status reflects your selected accessibility
              profile, not a percentage of all available settings.
            </p>
          </div>

          {/* Recent Activity */}
          <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <TrendingUp className="text-blue-600" />
              Recent Activity
            </h2>

            {recentActivity.length > 0 ? (
              <div className="mt-8 space-y-5">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`border-l-4 ${activity.color} pl-4`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {activity.title}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        {activity.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                      {activity.description}
                    </p>

                    {activity.time > 0 && (
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(activity.time).toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl bg-slate-50 px-5 py-10 text-center">
                <Activity
                  size={35}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-4 font-semibold text-gray-800">
                  No activity recorded yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Your saved accessibility requests and SOS alerts
                  will appear here when available.
                </p>

                <Link
                  to="/help"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700"
                >
                  Get Support
                  <ArrowRight size={17} />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
