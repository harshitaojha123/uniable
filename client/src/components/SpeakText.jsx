
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  Square,
  Loader2,
} from "lucide-react";

export default function SpeakText({ text }) {
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const utteranceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis?.cancel();
        utteranceRef.current = null;
      }
    };
  }, []);

  const speak = () => {
    if (!text?.trim()) {
      setError("No text available to speak.");
      return;
    }

    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      setError(
        "Text-to-speech is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();
    setSpeaking(false);
    setError("");

    const utterance = new SpeechSynthesisUtterance(
      text.trim()
    );

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setSpeaking(true);
      setError("");
    };

    utterance.onend = () => {
      setSpeaking(false);
      utteranceRef.current = null;
    };

    utterance.onerror = (event) => {
      setSpeaking(false);
      utteranceRef.current = null;

      if (event.error !== "canceled" &&
          event.error !== "interrupted") {
        setError(
          "Unable to play speech. Please try again."
        );
        console.error("Speech synthesis error:", event.error);
      }
    };

    utteranceRef.current = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      utteranceRef.current = null;
      setSpeaking(false);
      setError("Could not start speech. Please try again.");
      console.error("Speech start error:", err);
    }
  };

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;
    setSpeaking(false);
    setError("");
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex flex-col items-start gap-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        {!speaking ? (
          <button
            type="button"
            onClick={speak}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <Volume2 size={18} />
            Speak
          </button>
        ) : (
          <>
            <button
              type="button"
              disabled
              className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white"
            >
              <Loader2
                size={18}
                className="animate-spin"
              />
              Speaking...
            </button>

            <button
              type="button"
              onClick={stop}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Square size={18} />
              Stop
            </button>
          </>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </motion.div>
  );
}
