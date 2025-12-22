import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AddLocationForm({ setLocations, selectedPos }) {
  const { user } = useAuth();
  const [place, setPlace] = useState("");
  const [type, setType] = useState("wheelchair");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!place || !description || !selectedPos) {
      alert("Please fill all fields and select a location on the map");
      return;
    }

    const existing =
      JSON.parse(localStorage.getItem("campusLocations")) || [];

    // ✅ CAMPUS ACCESSIBILITY DATA MODEL
    const newLocation = {
      id: Date.now(),
      place: place,
      description: description,
      type: type, // wheelchair | visual | hearing | general
      lat: selectedPos.lat,
      lng: selectedPos.lng,
      reportedBy: user.email,
      resolved: false,
    };

    const updated = [newLocation, ...existing];

    localStorage.setItem(
      "campusLocations",
      JSON.stringify(updated)
    );

    setLocations(updated);
    setPlace("");
    setDescription("");
  };

  return (
    <form
      onSubmit={submit}
      className="border rounded p-4 space-y-3"
    >
      <h3 className="font-semibold text-lg">
        Report Campus Accessibility Issue
      </h3>

      {/* LOCATION NAME */}
      <input
        className="w-full border rounded p-2"
        placeholder="Location (e.g. Block A Entrance)"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />

      {/* ACCESSIBILITY TYPE */}
      <select
        className="w-full border rounded p-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="wheelchair">Wheelchair Access</option>
        <option value="visual">Visual Assistance</option>
        <option value="hearing">Hearing Assistance</option>
        <option value="general">General Accessibility</option>
      </select>

      {/* DESCRIPTION */}
      <textarea
        className="w-full border rounded p-2"
        rows={3}
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* MAP SELECTION INFO */}
      {selectedPos ? (
        <p className="text-sm text-green-600">
          Selected on map: {selectedPos.lat.toFixed(5)},{" "}
          {selectedPos.lng.toFixed(5)}
        </p>
      ) : (
        <p className="text-sm text-red-500">
          Please click on the map to select location
        </p>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
