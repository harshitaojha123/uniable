import { useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Square,
  Loader2,
} from "lucide-react";

export default function SpeakText({ text }) {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text?.trim()) {
      alert("No text available to speak.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-center gap-3"
    >
      {!speaking ? (
        <button
          onClick={speak}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          <Volume2 size={18} />
          Speak
        </button>
      ) : (
        <>
          <button
            disabled
            className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-white font-semibold"
          >
            <Loader2 size={18} className="animate-spin" />
            Speaking...
          </button>

          <button
            onClick={stop}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white font-semibold hover:bg-red-700 transition"
          >
            <Square size={18} />
            Stop
          </button>
        </>
      )}
    </motion.div>
  );
}