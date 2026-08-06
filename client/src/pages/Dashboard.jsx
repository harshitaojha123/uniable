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
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Accessibility Requests",
    value: "12",
    icon: Accessibility,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Resolved",
    value: "9",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Pending",
    value: "3",
    icon: Clock3,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "AI Assistance",
    value: "24",
    icon: Bot,
    color: "from-purple-500 to-indigo-500",
  },
];

const actions = [
  {
    title: "Accessibility",
    desc: "Manage accessibility settings",
    icon: Accessibility,
    link: "/access",
  },
  {
    title: "Campus Map",
    desc: "Find accessible routes",
    icon: MapPinned,
    link: "/campus",
  },
  {
    title: "AI Assistant",
    desc: "Ask anything instantly",
    icon: Bot,
    link: "/ai",
  },
  {
    title: "Emergency Help",
    desc: "Request urgent assistance",
    icon: ShieldAlert,
    link: "/help",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl"
        >
          <h1 className="text-4xl font-black">
            Welcome Back 👋
          </h1>

          <p className="mt-5 text-blue-100 text-xl max-w-3xl leading-8">
            Your accessibility hub is ready. Manage requests, navigate your
            campus, connect with the AI assistant and access emergency support
            from one place.
          </p>

          <div className="mt-8 flex gap-5">

            <Link
              to="/access"
              className="rounded-xl bg-white text-blue-700 px-6 py-3 font-bold hover:scale-105 transition flex items-center gap-2"
            >
              Accessibility

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/ai"
              className="rounded-xl border border-white px-6 py-3 hover:bg-white hover:text-blue-700 transition"
            >
              AI Assistant
            </Link>

          </div>

        </motion.div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                whileHover={{ y: -8 }}
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="text-4xl font-black mt-6">
                  {item.value}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.title}
                </p>

              </motion.div>
            );
          })}

        </div>

        {/* Quick Actions */}

        <div className="mt-14">

          <h2 className="text-3xl font-black mb-8">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {actions.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link key={index} to={item.link}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="rounded-3xl bg-white shadow-lg p-8 h-full"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <Icon />
                    </div>

                    <h3 className="text-xl font-bold mt-6">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 mt-3">
                      {item.desc}
                    </p>

                  </motion.div>
                </Link>
              );
            })}

          </div>

        </div>

        {/* Progress */}

        <div className="grid lg:grid-cols-2 gap-8 mt-14">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold">
              Accessibility Progress
            </h2>

            <div className="mt-8">

              <div className="flex justify-between mb-2">
                <span>Profile Completion</span>
                <span>80%</span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              </div>

            </div>

            <div className="mt-8">

              <div className="flex justify-between mb-2">
                <span>Accessibility Setup</span>
                <span>65%</span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-green-500"></div>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold flex items-center gap-3">

              <TrendingUp />

              Recent Activity

            </h2>

            <div className="space-y-6 mt-8">

              <div className="border-l-4 border-blue-600 pl-4">
                Accessibility request submitted.
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                AI Assistant answered your query.
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                Campus navigation updated.
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                Emergency contacts verified.
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}