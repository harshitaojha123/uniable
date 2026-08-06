import {
  Accessibility,
  Eye,
  Ear,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function MapFilters({
  filters,
  setFilters,
}) {
  const options = [
    {
      id: "wheelchair",
      label: "Wheelchair",
      icon: <Accessibility size={18} />,
      color: "bg-blue-600",
    },
    {
      id: "visual",
      label: "Visual",
      icon: <Eye size={18} />,
      color: "bg-purple-600",
    },
    {
      id: "hearing",
      label: "Hearing",
      icon: <Ear size={18} />,
      color: "bg-green-600",
    },
    {
      id: "general",
      label: "General",
      icon: <Building2 size={18} />,
      color: "bg-orange-500",
    },
  ];

  const toggleFilter = (id) => {
    setFilters((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="mb-8">

      <h3 className="text-xl font-bold mb-4">
        Filter Accessibility Categories
      </h3>

      <div className="flex flex-wrap gap-4">

        {options.map((item) => {
          const active = filters.includes(item.id);

          return (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              onClick={() => toggleFilter(item.id)}
              className={`flex items-center gap-3 rounded-2xl px-5 py-3 border-2 transition-all font-semibold shadow-sm
                ${
                  active
                    ? `${item.color} border-transparent text-white shadow-lg`
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-400"
                }`}
            >
              {item.icon}
              {item.label}
            </motion.button>
          );
        })}

      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing <span className="font-semibold">{filters.length}</span> accessibility
        {filters.length === 1 ? " category" : " categories"}.
      </p>

    </div>
  );
}