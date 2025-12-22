import { useEffect, useState } from "react";

export default function VisualSettings() {
  const [highContrast, setHighContrast] = useState(
    JSON.parse(localStorage.getItem("highContrast")) || false
  );
  const [dyslexiaFont, setDyslexiaFont] = useState(
    JSON.parse(localStorage.getItem("dyslexiaFont")) || false
  );
  const [highlightUI, setHighlightUI] = useState(
    JSON.parse(localStorage.getItem("highlightUI")) || false
  );

  useEffect(() => {
    document.body.style.backgroundColor = highContrast ? "#000" : "";
    document.body.style.color = highContrast ? "#fff" : "";
    document.body.style.fontFamily = dyslexiaFont
      ? "Arial, sans-serif"
      : "";

    document.body.classList.toggle("highlight-ui", highlightUI);

    localStorage.setItem("highContrast", highContrast);
    localStorage.setItem("dyslexiaFont", dyslexiaFont);
    localStorage.setItem("highlightUI", highlightUI);
  }, [highContrast, dyslexiaFont, highlightUI]);

  return (
    <section className="mb-8 space-y-3">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={highContrast}
          onChange={() => setHighContrast(!highContrast)}
        />
        High Contrast Mode
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={dyslexiaFont}
          onChange={() => setDyslexiaFont(!dyslexiaFont)}
        />
        Dyslexia-Friendly Font
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={highlightUI}
          onChange={() => setHighlightUI(!highlightUI)}
        />
        Highlight Buttons & Links
      </label>
    </section>
  );
}
