import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  X,
  Send,
  HeartPulse,
} from "lucide-react";

export default function SOSModal({ onClose, onSubmit }) {
  const [reason, setReason] = useState("");

  const quickReasons = [
    "Need wheelchair assistance",
    "Medical emergency",
    "Unable to reach classroom",
    "Need immediate accessibility support",
  ];

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert("Please enter an emergency reason.");
      return;
    }

    onSubmit(reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >

        {/* Header */}

        <div className="bg-gradient-to-r from-red-600 to-red-500 p-7 text-white">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/20 p-3">

                <ShieldAlert size={32} />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  Emergency SOS
                </h2>

                <p className="mt-1 text-red-100">
                  Your request will immediately notify the administration.
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition"
            >
              <X size={22} />
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="rounded-2xl bg-red-50 border border-red-200 p-5 mb-6">

            <div className="flex items-center gap-3">

              <HeartPulse className="text-red-600" />

              <span className="font-semibold text-red-700">
                Tell us briefly what happened.
              </span>

            </div>

          </div>

          {/* Quick Buttons */}

          <h3 className="font-semibold text-gray-700 mb-3">
            Quick Reasons
          </h3>

          <div className="flex flex-wrap gap-3 mb-6">

            {quickReasons.map((item) => (
              <button
                key={item}
                onClick={() => setReason(item)}
                className="rounded-full border border-red-300 px-4 py-2 hover:bg-red-600 hover:text-white transition"
              >
                {item}
              </button>
            ))}

          </div>

          {/* Textarea */}

          <textarea
            rows={6}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your emergency..."
            className="w-full resize-none rounded-2xl border border-gray-300 p-4 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
          />

          <div className="mt-2 flex justify-end text-sm text-gray-500">

            {reason.length} Characters

          </div>

          {/* Footer */}

          <div className="mt-8 flex justify-end gap-4">

            <button
              onClick={onClose}
              className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-7 py-3 font-semibold text-white hover:bg-red-700 transition hover:scale-105"
            >
              <Send size={18} />

              Send SOS

            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
}