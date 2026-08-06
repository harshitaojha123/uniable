import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Loader2,
} from "lucide-react";

export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      onResult(transcript);
    };

    recognition.start();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-center gap-3"
    >
      {!listening ? (
        <button
          type="button"
          onClick={startListening}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 text-white font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
        >
          <Mic size={20} />
          Start Voice Input
        </button>
      ) : (
        <button
          disabled
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white font-semibold"
        >
          <Loader2
            size={20}
            className="animate-spin"
          />

          Listening...

          <MicOff size={18} />
        </button>
      )}
    </motion.div>
  );
}