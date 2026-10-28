
import { Accessibility, Eye, Ear, Building2, Check } from "lucide-react";
import { motion } from "framer-motion";

const options = [
  {
    id: "wheelchair",
    label: "Wheelchair Access",
    icon: Accessibility,
    color: "bg-blue-600",
  },
  {
    id: "visual",
    label: "Visual Assistance",
    icon: Eye,
    color: "bg-purple-600",
  },
  {
    id: "hearing",
    label: "Hearing Assistance",
    icon: Ear,
    color: "bg-green-600",
  },
  {
    id: "general",
    label: "General Accessibility",
    icon: Building2,
    color: "bg-orange-500",
  },
];

export default function MapFilters({ filters = [], setFilters }) {
  const toggleFilter = (id) => {
    setFilters((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const selectAll = () => {
    setFilters(options.map((option) => option.id));
  };

  const clearAll = () => {
    setFilters([]);
  };

  return (
    <section className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="text-xl font-bold text-gray-900">
          Filter Accessibility Categories
        </h3>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          >
            Select All
          </button>

          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {options.map((item) => {
          const active = filters.includes(item.id);
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggleFilter(item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                active
                  ? `${item.color} border-transparent text-white shadow-md`
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
              }`}
            >
              <Icon size={22} aria-hidden="true" />

              <span className="flex-1 text-sm">{item.label}</span>

              {active && <Check size={18} aria-hidden="true" />}
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-gray-600" aria-live="polite">
        {filters.length} of {options.length} categories selected.
        {filters.length === 0
          ? " No locations will be shown until you select a category."
          : ""}
      </p>
    </section>
  );
}
