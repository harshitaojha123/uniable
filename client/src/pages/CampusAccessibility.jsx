
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinned,
  Search,
  Accessibility,
  Map,
  Filter,
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

  // Load saved accessibility reports.
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("campusLocations") || "[]"
      );

      setLocations(Array.isArray(stored) ? stored : []);
    } catch (error) {
      console.error("Unable to load campus reports:", error);
      setLocations([]);
    }
  }, []);

  // Apply category filters and search.
  const filteredLocations = locations.filter((loc) => {
    const matchesType = filters.includes(loc.type);
    const query = search.trim().toLowerCase();

    const place = (loc.place || loc.name || "").toLowerCase();
    const description = (loc.description || "").toLowerCase();

    const matchesSearch =
      !query ||
      place.includes(query) ||
      description.includes(query);

    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-6 sm:p-10 shadow-xl"
        >
          <div className="flex flex-wrap items-center gap-5">
            <MapPinned size={42} />

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-black">
                Campus Accessibility
              </h1>

              <p className="mt-3 text-blue-100 leading-relaxed">
                Discover accessible facilities and report barriers
                to help create a more inclusive campus.
              </p>
            </div>

            <Accessibility
              size={48}
              className="hidden sm:block"
            />
          </div>
        </motion.section>

        {/* Report summary */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-gray-500">Total Reports</p>
            <p className="text-3xl font-bold mt-1">
              {locations.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-gray-500">Matching Reports</p>
            <p className="text-3xl font-bold mt-1">
              {filteredLocations.length}
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="rounded-2xl bg-white p-5 shadow-md">
          <label
            htmlFor="campus-search"
            className="flex items-center gap-3"
          >
            <Search className="text-blue-600 shrink-0" />

            <input
              id="campus-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search locations or accessibility issues..."
              className="w-full outline-none p-2"
            />
          </label>
        </section>

        {/* Category filters */}
        <section className="rounded-3xl bg-white p-5 sm:p-6 shadow-md">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Filter className="text-blue-600" />
            Filter Accessibility Categories
          </h2>

          <MapFilters
            filters={filters}
            setFilters={setFilters}
          />
        </section>

        {/* Interactive map */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
              <Map className="text-blue-600" />
              Interactive Campus Map
            </h2>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {filteredLocations.length} locations
            </span>
          </div>

          <CampusMap
            locations={filteredLocations}
            onMapClick={setSelectedPos}
          />
        </section>

        {/* Add a report */}
        <section>
          <AddLocationForm
            setLocations={setLocations}
            selectedPos={selectedPos}
          />
        </section>

        {/* Report list */}
        <section className="rounded-3xl bg-white p-5 sm:p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-5">
            Accessibility Reports
          </h2>

          {filteredLocations.length === 0 ? (
            <p className="text-gray-500">
              No reports match your current search and filters.
              Try changing your search or selecting more categories.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredLocations.map((loc) => (
                <article
                  key={loc.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <h3 className="text-lg font-bold">
                      {loc.place || loc.name || "Unnamed location"}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        loc.resolved
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {loc.resolved ? "Resolved" : "Pending"}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600">
                    {loc.description}
                  </p>

                  <p className="mt-2 text-sm text-gray-500 capitalize">
                    Category: {loc.type}
                  </p>

                  {loc.createdAt && (
                    <p className="mt-1 text-xs text-gray-500">
                      Reported: {loc.createdAt}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
