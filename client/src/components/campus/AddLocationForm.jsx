import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  MapPin,
  Accessibility,
  FileText,
  Send,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AddLocationForm({
  setLocations,
  selectedPos,
}) {
  const { user } = useAuth();

  const [place, setPlace] = useState("");
  const [type, setType] = useState("wheelchair");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!place || !description || !selectedPos) {
      alert(
        "Please fill all fields and select a location on the map."
      );
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("campusLocations")) || [];

    const newLocation = {
      id: Date.now(),
      place,
      description,
      type,
      lat: selectedPos.lat,
      lng: selectedPos.lng,
      reportedBy: user.email,
      resolved: false,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newLocation, ...existing];

    localStorage.setItem(
      "campusLocations",
      JSON.stringify(updated)
    );

    setLocations(updated);

    setPlace("");
    setDescription("");

    alert("Accessibility issue submitted successfully!");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="mt-8 rounded-3xl bg-white p-8 shadow-xl"
    >
      <div className="flex items-center gap-4 mb-8">

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <Accessibility size={30} />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Report Accessibility Issue
          </h2>

          <p className="text-gray-500">
            Help improve campus accessibility by reporting problems.
          </p>

        </div>

      </div>

      <div className="space-y-6">

        {/* Location */}

        <div>

          <label className="font-semibold mb-2 block">
            Location Name
          </label>

          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Example: Library Entrance"
            className="w-full rounded-xl border border-gray-300 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

        </div>

        {/* Type */}

        <div>

          <label className="font-semibold mb-2 block">
            Accessibility Category
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="wheelchair">
              ♿ Wheelchair Access
            </option>

            <option value="visual">
              👁️ Visual Assistance
            </option>

            <option value="hearing">
              👂 Hearing Assistance
            </option>

            <option value="general">
              🏫 General Accessibility
            </option>

          </select>

        </div>

        {/* Description */}

        <div>

          <label className="font-semibold mb-2 block">
            Issue Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe the accessibility issue..."
            className="w-full rounded-xl border border-gray-300 p-4 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />

        </div>

        {/* Selected Position */}

        <div
          className={`rounded-2xl border p-5 ${
            selectedPos
              ? "bg-green-50 border-green-300"
              : "bg-red-50 border-red-300"
          }`}
        >

          {selectedPos ? (
            <div className="flex items-center gap-3">

              <CheckCircle2
                className="text-green-600"
                size={24}
              />

              <div>

                <p className="font-semibold text-green-700">
                  Location Selected
                </p>

                <p className="text-sm text-gray-600">
                  {selectedPos.lat.toFixed(5)} ,
                  {" "}
                  {selectedPos.lng.toFixed(5)}
                </p>

              </div>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <MapPin
                className="text-red-600"
                size={24}
              />

              <p className="text-red-600 font-semibold">
                Click on the campus map to choose a location.
              </p>

            </div>
          )}

        </div>

        {/* Submit */}

        <button
          type="submit"
          className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold shadow-lg transition hover:scale-105"
        >
          <Send size={20} />
          Submit Report
        </button>

      </div>

      {/* Tips */}

      <div className="mt-8 rounded-2xl bg-blue-50 p-5 border border-blue-200">

        <h3 className="flex items-center gap-2 font-semibold text-blue-700">

          <FileText size={18} />

          Reporting Tips

        </h3>

        <ul className="mt-3 space-y-2 text-sm text-blue-700 list-disc list-inside">
          <li>Select the exact position on the map.</li>
          <li>Provide a clear description of the issue.</li>
          <li>Include nearby landmarks if possible.</li>
        </ul>

      </div>

    </motion.form>
  );
}