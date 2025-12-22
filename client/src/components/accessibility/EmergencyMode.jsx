import { useAccessibility } from "../../context/AccessibilityContext";

export default function EmergencyMode() {
  const {
    setFontSize,
    setHighContrast,
    setDyslexiaFont,
  } = useAccessibility();

  const activateEmergency = () => {
    setFontSize(22);
    setHighContrast(true);
    setDyslexiaFont(true);

    alert("Emergency Accessibility Mode Activated");
  };

  return (
    <div className="border border-red-500 bg-red-50 p-4 rounded mt-6">
      <h3 className="font-bold text-red-600 mb-2">
        🚨 Emergency Accessibility Mode
      </h3>

      <p className="text-sm mb-3">
        Instantly enable maximum accessibility support for emergency situations.
      </p>

      <button
        onClick={activateEmergency}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Activate Emergency Mode
      </button>
    </div>
  );
}
