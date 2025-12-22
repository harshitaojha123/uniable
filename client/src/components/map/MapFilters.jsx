export default function MapFilters({ filters, setFilters }) {
  return (
    <div className="flex gap-4 flex-wrap mb-4">
      {["wheelchair", "visual", "hearing", "general"].map((type) => (
        <label key={type} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.includes(type)}
            onChange={() =>
              setFilters((prev) =>
                prev.includes(type)
                  ? prev.filter((f) => f !== type)
                  : [...prev, type]
              )
            }
          />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      ))}
    </div>
  );
}
