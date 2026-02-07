import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(stored);
  }, []);

  // ✅ Toggle resolve
  const toggleResolved = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, resolved: !req.resolved } : req
    );

    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  // ❌ Remove request
  const removeRequest = (id) => {
    const updated = requests.filter((req) => req.id !== id);
    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  return (
    <div className="p-6 pt-20 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        {/* 🔗 SOS ALERTS LINK */}
       
       
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between border rounded p-4"
            >
              {/* REQUEST INFO */}
              <div>
                <h3 className="font-semibold">{req.title}</h3>
                <p className="text-sm text-gray-600">{req.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Requested by: {req.email}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={req.resolved}
                    onChange={() => toggleResolved(req.id)}
                  />
                  {req.resolved ? "Resolved" : "Pending"}
                </label>

                <button
                  onClick={() => removeRequest(req.id)}
                  className="text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
