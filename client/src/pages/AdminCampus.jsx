import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinned,
  Search,
  CheckCircle2,
  Clock3,
  Map,
} from "lucide-react";

import LocationCard from "../components/campus/LocationCard";

export default function AdminCampus() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("campusLocations")) || [];

    setLocations(stored);
  }, []);

  const toggle = (id) => {
    const updated = locations.map((loc) =>
      loc.id === id
        ? { ...loc, resolved: !loc.resolved }
        : loc
    );

    setLocations(updated);

    localStorage.setItem(
      "campusLocations",
      JSON.stringify(updated)
    );
  };

  const filtered = useMemo(() => {
    return locations.filter((loc) =>
      `${loc.name} ${loc.description} ${loc.type}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [locations, search]);

  const total = locations.length;
  const resolved = locations.filter(
    (l) => l.resolved
  ).length;
  const pending = total - resolved;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

          <div className="flex items-center gap-5">

            <MapPinned size={52} />

            <div>

              <h1 className="text-5xl font-black">
                Campus Accessibility
              </h1>

              <p className="mt-3 text-blue-100 text-lg">
                Manage accessibility reports and campus facilities.
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-lg p-7"
          >

            <Map className="text-blue-600" size={34} />

            <h3 className="text-gray-500 mt-4">
              Total Reports
            </h3>

            <h2 className="text-4xl font-black">
              {total}
            </h2>

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-lg p-7"
          >

            <Clock3 className="text-orange-500" size={34} />

            <h3 className="text-gray-500 mt-4">
              Pending
            </h3>

            <h2 className="text-4xl font-black">
              {pending}
            </h2>

          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-lg p-7"
          >

            <CheckCircle2 className="text-green-600" size={34} />

            <h3 className="text-gray-500 mt-4">
              Resolved
            </h3>

            <h2 className="text-4xl font-black">
              {resolved}
            </h2>

          </motion.div>

        </div>

        {/* Search */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">

          <Search className="text-gray-400" />

          <input
            className="flex-1 outline-none"
            placeholder="Search locations..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Reports */}

        <div className="mt-8 space-y-6">

          {filtered.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

              <MapPinned
                size={60}
                className="mx-auto text-gray-400"
              />

              <h2 className="text-2xl font-bold mt-5">
                No Accessibility Reports
              </h2>

              <p className="text-gray-500 mt-2">
                Campus reports will appear here.
              </p>

            </div>

          ) : (

            filtered.map((loc) => (
              <motion.div
                key={loc.id}
                whileHover={{ scale: 1.01 }}
              >

                <LocationCard
                  data={loc}
                  admin
                  onToggle={toggle}
                />

              </motion.div>
            ))

          )}

        </div>

      </div>

    </div>
  );
}