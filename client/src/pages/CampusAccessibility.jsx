import { useEffect, useState } from "react";
import CampusMap from "../components/map/CampusMap";
import MapFilters from "../components/map/MapFilters";
import AddLocationForm from "../components/campus/AddLocationForm";

export default function CampusAccessibility() {
  const [locations, setLocations] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null);
  const [filters, setFilters] = useState([
    "wheelchair",
    "visual",
    "hearing",
    "general",
  ]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("campusLocations")) || [];
    setLocations(stored);
  }, []);

  const filteredLocations = locations.filter((loc) =>
    filters.includes(loc.type)
  );

  return (
    <div className="p-6 pt-20 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        Campus Accessibility
      </h2>

      <MapFilters filters={filters} setFilters={setFilters} />

      <CampusMap
        locations={filteredLocations}
        onMapClick={setSelectedPos}
      />

      <AddLocationForm
        setLocations={setLocations}
        selectedPos={selectedPos}
      />
    </div>
  );
}
