
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Loader2 } from "lucide-react";

export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Speech recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    if (recognitionRef.current) return;

    setError("");

    try {
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setListening(true);
        setError("");
      };

      recognition.onresult = (event) => {
        let transcript = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          transcript += event.results[i][0].transcript;
        }

        if (
          transcript.trim() &&
          typeof onResult === "function"
        ) {
          onResult(transcript.trim());
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);

        const messages = {
          "not-allowed":
            "Microphone permission denied. Allow microphone access in Chrome site settings.",
          "service-not-allowed":
            "Speech recognition service is blocked by your browser.",
          "audio-capture":
            "No microphone detected. Check your microphone connection.",
          "no-speech":
            "No speech detected. Click Start and speak clearly.",
          network:
            "Speech recognition network error. Check your internet connection.",
          aborted:
            "Speech recognition was stopped.",
        };

        if (event.error !== "aborted") {
          setError(
            messages[event.error] ||
              `Recognition failed: ${event.error}`
          );
        }
      };

      recognition.onend = () => {
        recognitionRef.current = null;
        setListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start recognition:", err);
      recognitionRef.current = null;
      setListening(false);
      setError(
        err.message || "Unable to start speech recognition."
      );
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex flex-col items-start gap-3"
    >
      <div className="flex flex-wrap items-center gap-3">
        {!listening ? (
          <button
            type="button"
            onClick={startListening}
            disabled={!!recognitionRef.current}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
          >
            <Mic size={20} />
            Start Voice Input
          </button>
        ) : (
          <>
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 font-semibold text-green-700">
              <Loader2 size={20} className="animate-spin" />
              Listening...
            </div>

            <button
              type="button"
              onClick={stopListening}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              <MicOff size={18} />
              Stop
            </button>
          </>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="max-w-xl rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </motion.div>
  );
}
