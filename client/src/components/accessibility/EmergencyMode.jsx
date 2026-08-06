import { useState } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
import {
  ShieldAlert,
  TriangleAlert,
  CheckCircle2,
  Timer,
} from "lucide-react";

export default function EmergencyMode() {
  const {
    setFontSize,
    setHighContrast,
    setDyslexiaFont,
  } = useAccessibility();

  const [activated, setActivated] = useState(false);

  const activateEmergency = () => {
    setFontSize(22);
    setHighContrast(true);
    setDyslexiaFont(true);

    setActivated(true);

    setTimeout(() => {
      alert("Emergency Accessibility Mode Activated");
    }, 300);
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white p-8 shadow-xl">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 p-4">
            <ShieldAlert size={34} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Emergency Accessibility Mode
            </h2>

            <p className="text-red-100 mt-2">
              Instantly optimize the interface for emergency situations.
            </p>

          </div>

        </div>

      </div>

      {/* Features */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <TriangleAlert className="text-red-600 mb-4" size={30} />

          <h3 className="font-bold text-lg">
            High Contrast
          </h3>

          <p className="text-gray-500 mt-2">
            Makes all interface elements easier to distinguish.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <CheckCircle2 className="text-green-600 mb-4" size={30} />

          <h3 className="font-bold text-lg">
            Large Text
          </h3>

          <p className="text-gray-500 mt-2">
            Automatically increases font size for readability.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <Timer className="text-blue-600 mb-4" size={30} />

          <h3 className="font-bold text-lg">
            Quick Access
          </h3>

          <p className="text-gray-500 mt-2">
            Enables accessibility features with one click.
          </p>

        </div>

      </div>

      {/* Status */}

      <div
        className={`rounded-2xl p-6 border-2 transition-all ${
          activated
            ? "bg-green-50 border-green-500"
            : "bg-red-50 border-red-400"
        }`}
      >

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div>

            <h3 className="text-2xl font-bold">

              {activated
                ? "Emergency Mode Active"
                : "Emergency Mode Inactive"}

            </h3>

            <p className="mt-2 text-gray-600">

              {activated
                ? "Maximum accessibility settings are currently enabled."
                : "Press the button below to instantly enable all emergency accessibility settings."}

            </p>

          </div>

          <div>

            {!activated ? (
              <button
                onClick={activateEmergency}
                className="rounded-xl bg-red-600 hover:bg-red-700 transition px-8 py-4 text-white font-bold text-lg shadow-lg hover:scale-105"
              >
                🚨 Activate Now
              </button>
            ) : (
              <div className="rounded-xl bg-green-600 px-6 py-4 text-white font-bold">
                ✓ Activated
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}