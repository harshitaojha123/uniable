import { useAccessibility } from "../../context/AccessibilityContext";

export default function DisabilitySelector() {
  const { setDisability } = useAccessibility();

  const options = [
    { id: "visual", label: "Visual Impairment" },
    { id: "hearing", label: "Hearing Impairment" },
    { id: "mobility", label: "Mobility Impairment" },
    { id: "learning", label: "Learning Disability" },
    { id: "none", label: "Prefer not to say" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Select your accessibility need
        </h2>

        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDisability(opt.id)}
              className="w-full border rounded p-2 hover:bg-blue-50"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
