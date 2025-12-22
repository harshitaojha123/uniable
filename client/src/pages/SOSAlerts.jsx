import { useEffect, useState } from "react";

export default function SOSAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sosAlerts")) || [];
    setAlerts(stored);
  }, []);

  const markResolved = (id) => {
    const updated = alerts.map((alert) =>
      alert.id === id ? { ...alert, status: "resolved" } : alert
    );


    setAlerts(updated);
    localStorage.setItem("sosAlerts", JSON.stringify(updated));
  };
const removeSOS = (id) => {
  const filtered = alerts.filter((alert) => alert.id !== id);
  setAlerts(filtered);
  localStorage.setItem("sosAlerts", JSON.stringify(filtered));
};

  return (
    <div className="p-6 pt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🚨 SOS Alerts</h1>

      {alerts.length === 0 && (
        <p className="text-gray-500">No SOS alerts received.</p>
      )}

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <p><b>Email:</b> {alert.email}</p>
          <p><b>Disability:</b> {alert.disability}</p>
          <p><b>Reason:</b> {alert.reason}</p>
          <p><b>Time:</b> {alert.time}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={
                alert.status === "pending"
                  ? "text-red-600 font-semibold"
                  : "text-green-600 font-semibold"
              }
            >
              {alert.status}
            </span>
          </p>

         <div className="flex gap-3 mt-3">
  {alert.status === "pending" && (
    <button
      onClick={() => markResolved(alert.id)}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Mark as Resolved
    </button>
  )}

  <button
    onClick={() => removeSOS(alert.id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Remove
  </button>
</div>
        </div>
      ))}
    </div>
  );
}
