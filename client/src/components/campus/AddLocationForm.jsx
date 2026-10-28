
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  MapPin,
  Accessibility,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
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
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!place.trim() || !description.trim()) {
      setMessage("Please enter the location name and issue description.");
      return;
    }

    if (
      !selectedPos ||
      !Number.isFinite(Number(selectedPos.lat)) ||
      !Number.isFinite(Number(selectedPos.lng))
    ) {
      setMessage("Please select a valid location on the map.");
      return;
    }

    if (!user?.email) {
      setMessage("Please log in before submitting a report.");
      return;
    }

    setSubmitting(true);

    try {
      let existing = [];

      try {
        const stored = JSON.parse(
          localStorage.getItem("campusLocations") || "[]"
        );
        existing = Array.isArray(stored) ? stored : [];
      } catch {
        existing = [];
      }

      const newLocation = {
        id: Date.now(),
        place: place.trim(),
        description: description.trim(),
        type,
        lat: Number(selectedPos.lat),
        lng: Number(selectedPos.lng),
        reportedBy: user.email,
        resolved: false,
        createdAt: new Date().toISOString(),
      };

      const updated = [newLocation, ...existing];

      localStorage.setItem(
        "campusLocations",
        JSON.stringify(updated)
      );

      // Update the parent page so the marker and report appear immediately.
      setLocations(updated);

      setPlace("");
      setDescription("");
      setType("wheelchair");
      setMessage("Accessibility report submitted successfully!");
    } catch (error) {
      console.error("Failed to submit accessibility report:", error);
      setMessage(
        "Unable to save the report. Please check browser storage and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const success = message.includes("successfully");

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="mt-8 rounded-3xl bg-white p-6 sm:p-8 shadow-xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <Accessibility size={30} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Report Accessibility Issue
          </h2>
          <p className="text-gray-500 mt-1">
            Help make your campus more accessible for everyone.
          </p>
        </div>
      </div>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${
            success
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {success ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p>{message}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label
            htmlFor="location-place"
            className="block font-semibold mb-2"
          >
            Location Name
          </label>
          <input
            id="location-place"
            type="text"
            required
            maxLength={100}
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Example: Library Entrance"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="location-type"
            className="block font-semibold mb-2"
          >
            Accessibility Category
          </label>
          <select
            id="location-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="wheelchair">Wheelchair Access</option>
            <option value="visual">Visual Assistance</option>
            <option value="hearing">Hearing Assistance</option>
            <option value="general">General Accessibility</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="location-description"
            className="block font-semibold mb-2"
          >
            Issue Description
          </label>
          <textarea
            id="location-description"
            required
            maxLength={1000}
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the accessibility issue..."
            className="w-full rounded-xl border border-gray-300 p-4 resize-y outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div
          className={`rounded-2xl border p-5 ${
            selectedPos
              ? "bg-green-50 border-green-300"
              : "bg-amber-50 border-amber-300"
          }`}
        >
          {selectedPos ? (
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="text-green-600 shrink-0"
                size={24}
              />
              <div>
                <p className="font-semibold text-green-800">
                  Location Selected
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {Number(selectedPos.lat).toFixed(5)},{" "}
                  {Number(selectedPos.lng).toFixed(5)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <MapPin
                className="text-amber-700 shrink-0"
                size={24}
              />
              <p className="font-medium text-amber-800">
                Click on the campus map to select the report location.
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white font-bold shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={20} />
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>

      <div className="mt-8 rounded-2xl bg-blue-50 p-5 border border-blue-200">
        <h3 className="flex items-center gap-2 font-semibold text-blue-800">
          <FileText size={18} />
          Reporting Tips
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-blue-800 list-disc list-inside">
          <li>Select the exact location on the map.</li>
          <li>Describe the accessibility barrier clearly.</li>
          <li>Include nearby landmarks when possible.</li>
        </ul>
      </div>
    </motion.form>
  );
}
