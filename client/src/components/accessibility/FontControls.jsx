import { useEffect, useState } from "react";

export default function FontControls() {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || 16
  );

  useEffect(() => {
    document.body.style.fontSize = fontSize + "px";
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  return (
    <section className="mb-6">
      <h3 className="font-semibold mb-2">Text Size</h3>
      <div className="flex gap-4">
        <button
          onClick={() => setFontSize((s) => Math.max(12, s - 2))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          A-
        </button>
        <button
          onClick={() => setFontSize((s) => s + 2)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          A+
        </button>
      </div>
    </section>
  );
}
