import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinned,
  Search,
  Filter,
  Accessibility,
  Map,
} from "lucide-react";

import CampusMap from "../components/map/CampusMap";
import MapFilters from "../components/map/MapFilters";
import AddLocationForm from "../components/campus/AddLocationForm";

export default function CampusAccessibility() {
  const [locations, setLocations] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredLocations = locations.filter((loc) => {
    const matchType = filters.includes(loc.type);

    const matchSearch =
      !search ||
      loc.name?.toLowerCase().includes(search.toLowerCase()) ||
      loc.description?.toLowerCase().includes(search.toLowerCase());

    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl"
        >

          <div className="flex flex-wrap justify-between items-center gap-6">

            <div>

              <div className="flex items-center gap-4">

                <MapPinned size={42} />

                <h1 className="text-5xl font-black">
                  Campus Accessibility
                </h1>

              </div>

              <p className="mt-5 text-lg text-blue-100 max-w-3xl leading-8">
                Explore accessible locations, ramps, elevators,
                classrooms and facilities across your campus.
              </p>

            </div>

            <div className="hidden lg:flex w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-lg items-center justify-center">
              <Accessibility size={50} />
            </div>

          </div>

        </motion.div>

        {/* Search */}

        <div className="grid lg:grid-cols-3 gap-6 mt-10">

          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">

              <Search className="text-gray-400" />

              <input
                className="flex-1 outline-none"
                placeholder="Search locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div>

            <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">

              <Filter className="text-blue-600" />

              <span className="font-semibold">
                Filter Accessibility Types
              </span>

            </div>

          </div>

        </div>

        {/* Filters */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">

          <MapFilters
            filters={filters}
            setFilters={setFilters}
          />

        </div>

        {/* Map */}

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-8 rounded-3xl overflow-hidden shadow-2xl bg-white"
        >

          <div className="flex items-center justify-between border-b p-6">

            <div className="flex items-center gap-3">

              <Map className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Interactive Campus Map
              </h2>

            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
              {filteredLocations.length} Locations
            </span>

          </div>

          <CampusMap
            locations={filteredLocations}
            onMapClick={setSelectedPos}
          />

        </motion.div>

        {/* Add Location */}

        <div className="mt-10">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Add New Accessible Location
            </h2>

            <AddLocationForm
              setLocations={setLocations}
              selectedPos={selectedPos}
            />

          </div>

        </div>

      </div>

    </div>
  );
}