import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Type,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

export default function FontControls() {
  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || 16
  );

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  const resetFont = () => setFontSize(16);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100"
    >
      {/* Header */}

      <div className="flex items-center gap-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white">
          <Type size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Reading Preferences
          </h2>

          <p className="text-gray-500">
            Customize text size for comfortable reading.
          </p>
        </div>
      </div>

      {/* Preview */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 mb-8 border">

        <p
          style={{ fontSize: `${fontSize}px` }}
          className="font-medium text-gray-700 leading-relaxed transition-all"
        >
          This is how your reading text will appear throughout
          UniAble.
        </p>

      </div>

      {/* Slider */}

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">
            Font Size
          </span>

          <span className="font-bold text-blue-600">
            {fontSize}px
          </span>

        </div>

        <input
          type="range"
          min="12"
          max="32"
          value={fontSize}
          onChange={(e) =>
            setFontSize(Number(e.target.value))
          }
          className="w-full accent-blue-600"
        />

      </div>

      {/* Controls */}

      <div className="grid grid-cols-3 gap-4">

        <button
          onClick={() =>
            setFontSize((s) => Math.max(12, s - 2))
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 font-semibold hover:bg-gray-200 transition"
        >
          <Minus size={18} />

          Smaller

        </button>

        <button
          onClick={() =>
            setFontSize((s) => Math.min(32, s + 2))
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
        >
          <Plus size={18} />

          Larger

        </button>

        <button
          onClick={resetFont}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-100 py-3 font-semibold text-red-600 hover:bg-red-200 transition"
        >
          <RotateCcw size={18} />

          Reset

        </button>

      </div>

      {/* Tip */}

      <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-5">

        <h3 className="font-semibold text-green-700">
          💡 Accessibility Tip
        </h3>

        <p className="mt-2 text-sm text-green-600">
          A font size between <strong>18px and 22px</strong> is
          generally easier to read for most users with learning
          disabilities and low vision.
        </p>

      </div>

    </motion.div>
  );
}