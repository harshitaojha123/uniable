import { useEffect, useState } from "react";
import LocationCard from "../components/campus/LocationCard";

export default function AdminCampus() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(
      JSON.parse(localStorage.getItem("campusLocations")) || []
    );
  }, []);

  const toggle = (id) => {
    const updated = locations.map((l) =>
      l.id === id
        ? { ...l, resolved: !l.resolved }
        : l
    );
    setLocations(updated);
    localStorage.setItem(
      "campusLocations",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="p-6 pt-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Admin – Campus Accessibility
      </h2>

      <div className="space-y-4">
        {locations.length === 0 && (
          <p>No reports yet.</p>
        )}

        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            data={loc}
            admin
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
