import { useEffect, useState } from "react";
import {
  Contrast,
  Type,
  MousePointerClick,
  Eye,
} from "lucide-react";

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
    document.body.style.backgroundColor = highContrast
      ? "#000"
      : "";

    document.body.style.color = highContrast
      ? "#fff"
      : "";

    document.body.style.fontFamily = dyslexiaFont
      ? "Arial, sans-serif"
      : "";

    document.body.classList.toggle(
      "highlight-ui",
      highlightUI
    );

    localStorage.setItem(
      "highContrast",
      JSON.stringify(highContrast)
    );

    localStorage.setItem(
      "dyslexiaFont",
      JSON.stringify(dyslexiaFont)
    );

    localStorage.setItem(
      "highlightUI",
      JSON.stringify(highlightUI)
    );
  }, [highContrast, dyslexiaFont, highlightUI]);

  const settings = [
    {
      title: "High Contrast",
      description:
        "Increase visibility using a high contrast color scheme.",
      icon: Contrast,
      state: highContrast,
      setState: setHighContrast,
      color: "bg-blue-500",
    },
    {
      title: "Dyslexia-Friendly Font",
      description:
        "Use a font that's easier to read for many users.",
      icon: Type,
      state: dyslexiaFont,
      setState: setDyslexiaFont,
      color: "bg-purple-500",
    },
    {
      title: "Highlight Interactive Elements",
      description:
        "Highlight buttons, links and clickable controls.",
      icon: MousePointerClick,
      state: highlightUI,
      setState: setHighlightUI,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Preview */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">

        <div className="flex items-center gap-3">

          <Eye size={28} />

          <h2 className="text-2xl font-bold">
            Visual Accessibility
          </h2>

        </div>

        <p className="mt-3 text-blue-100">
          Customize the interface for a more comfortable
          reading and navigation experience.
        </p>

      </div>

      {/* Settings */}

      {settings.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border bg-white shadow-md hover:shadow-xl transition p-6 flex justify-between items-center"
          >

            <div className="flex items-center gap-5">

              <div
                className={`w-14 h-14 rounded-xl ${item.color} text-white flex items-center justify-center`}
              >
                <Icon size={26} />
              </div>

              <div>

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.description}
                </p>

              </div>

            </div>

            {/* iOS Switch */}

            <button
              onClick={() => item.setState(!item.state)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
                item.state
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  item.state
                    ? "translate-x-9"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>
        );
      })}

      {/* Live Preview */}

      <div className="rounded-2xl border bg-slate-50 p-6">

        <h3 className="text-xl font-bold mb-4">
          Preview
        </h3>

        <div
          className={`rounded-xl p-5 transition ${
            highContrast
              ? "bg-black text-white"
              : "bg-white text-gray-800"
          }`}
          style={{
            fontFamily: dyslexiaFont
              ? "Arial, sans-serif"
              : "inherit",
          }}
        >
          This is how your selected accessibility settings
          will affect the interface.
        </div>

      </div>

    </div>
  );
}