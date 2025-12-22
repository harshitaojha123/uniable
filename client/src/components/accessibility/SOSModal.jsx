import { useState } from "react";

export default function SOSModal({ onClose, onSubmit }) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert("Please enter SOS reason");
      return;
    }
    onSubmit(reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Emergency SOS</h2>

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Enter reason for SOS"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Send SOS
          </button>
        </div>
      </div>
    </div>
  );
}
