import {
  MapPin,
  User,
  CheckCircle2,
  AlertTriangle,
  Accessibility,
  Eye,
  Ear,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LocationCard({
  data,
  admin,
  onToggle,
}) {
  const icons = {
    wheelchair: <Accessibility size={20} />,
    visual: <Eye size={20} />,
    hearing: <Ear size={20} />,
    general: <Building2 size={20} />,
  };

  const colors = {
    wheelchair: "from-blue-500 to-cyan-500",
    visual: "from-purple-500 to-pink-500",
    hearing: "from-green-500 to-emerald-500",
    general: "from-orange-500 to-yellow-500",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6 transition-all"
    >
      <div className="flex justify-between items-start gap-6">

        {/* Left */}

        <div className="flex gap-5 flex-1">

          <div
            className={`rounded-2xl bg-gradient-to-r ${colors[data.type]} p-4 text-white`}
          >
            {icons[data.type]}
          </div>

          <div>

            <h3 className="text-xl font-bold flex items-center gap-2">
              <MapPin size={18} />
              {data.place}
            </h3>

            <p className="mt-3 text-gray-600">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 capitalize">
                {data.type}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                <User size={14} />
                {data.reportedBy}
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="text-right">

          {admin ? (
            <div className="space-y-3">

              <div
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  data.resolved
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.resolved
                  ? "Resolved"
                  : "Pending"}
              </div>

              <button
                onClick={() => onToggle(data.id)}
                className={`rounded-xl px-5 py-2 font-semibold transition ${
                  data.resolved
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {data.resolved
                  ? "Mark Pending"
                  : "Mark Resolved"}
              </button>

            </div>
          ) : (
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                data.resolved
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data.resolved ? (
                <>
                  <CheckCircle2 size={18} />
                  Accessible
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  Issue Reported
                </>
              )}
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
}