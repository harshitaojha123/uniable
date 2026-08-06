import { useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Square,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);

  const speak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8"
    >
      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-3 text-white">
          <Volume2 size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Text To Speech
          </h2>

          <p className="text-gray-500">
            Convert written text into spoken audio.
          </p>
        </div>

      </div>

      {/* Text Area */}

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
        className="w-full rounded-2xl border border-gray-300 p-4 focus:ring-2 focus:ring-green-500 outline-none resize-none"
      />

      {/* Speed */}

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="flex items-center gap-2 font-semibold">
            <SlidersHorizontal size={18} />
            Speech Speed
          </span>

          <span className="font-bold text-green-600">
            {rate.toFixed(1)}x
          </span>

        </div>

        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full accent-green-600"
        />

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-3 gap-4 mt-8">

        <button
          onClick={speak}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700 transition"
        >
          <Volume2 size={18} />
          Speak
        </button>

        <button
          onClick={stop}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          <Square size={18} />
          Stop
        </button>

        <button
          onClick={() => setText("")}
          className="flex items-center justify-center gap-2 rounded-xl bg-gray-200 py-3 font-semibold hover:bg-gray-300 transition"
        >
          <Trash2 size={18} />
          Clear
        </button>

      </div>

      {/* Tip */}

      <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-200 p-5">

        <h3 className="font-semibold text-blue-700">
          💡 Tip
        </h3>

        <p className="text-sm mt-2 text-blue-600">
          Use a slower speech speed when reading long paragraphs for better understanding.
        </p>

      </div>

    </motion.div>
  );
}