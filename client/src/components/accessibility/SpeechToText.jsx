
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Copy,
  Trash2,
  Volume2,
} from "lucide-react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const shouldListenRef = useRef(false);

  useEffect(() => {
    return () => {
      shouldListenRef.current = false;

      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
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
    shouldListenRef.current = true;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = finalTranscriptRef.current;

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscriptRef.current = finalTranscript;

      setText(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      const messages = {
        "not-allowed":
          "Microphone access denied. Allow microphone permission in Chrome site settings.",
        "service-not-allowed":
          "The browser has blocked the speech recognition service.",
        "audio-capture":
          "No microphone detected. Check your microphone connection.",
        "no-speech":
          "No speech detected. Try speaking clearly after clicking Start.",
        network:
          "Speech recognition network error. Check your internet connection.",
        aborted:
          "Speech recognition was stopped.",
      };

      if (event.error === "not-allowed" ||
          event.error === "service-not-allowed" ||
          event.error === "audio-capture") {
        shouldListenRef.current = false;
      }

      if (event.error !== "aborted") {
        setError(
          messages[event.error] ||
            `Speech recognition failed: ${event.error}`
        );
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      shouldListenRef.current = false;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error("Unable to start recognition:", err);
      recognitionRef.current = null;
      shouldListenRef.current = false;
      setListening(false);
      setError(
        "Unable to start the microphone. Please try again."
      );
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
  };

  const copyText = async () => {
    if (!text.trim()) {
      setError("There is no text to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setError("");
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      setError(
        "Unable to copy automatically. Please select and copy the text manually."
      );
    }
  };

  const clearText = () => {
    setText("");
    finalTranscriptRef.current = "";
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <Mic size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Speech To Text
          </h2>
          <p className="text-gray-500">
            Convert your voice into written text instantly.
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-5">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
            listening
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
          role="status"
          aria-live="polite"
        >
          {listening ? (
            <>
              <Mic size={16} />
              Listening...
            </>
          ) : (
            <>
              <MicOff size={16} />
              Not Listening
            </>
          )}
        </span>
      </div>

      {/* Transcript */}
      <textarea
        rows={7}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          finalTranscriptRef.current = e.target.value;
        }}
        placeholder="Your speech will appear here..."
        aria-label="Speech transcription"
        className="w-full rounded-2xl border border-gray-300 p-4 resize-y outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <button
          type="button"
          onClick={startListening}
          disabled={listening}
          className="rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          <span className="flex justify-center items-center gap-2">
            <Mic size={18} />
            Start
          </span>
        </button>

        <button
          type="button"
          onClick={stopListening}
          disabled={!listening}
          className="rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          <span className="flex justify-center items-center gap-2">
            <MicOff size={18} />
            Stop
          </span>
        </button>

        <button
          type="button"
          onClick={copyText}
          className="rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700"
        >
          <span className="flex justify-center items-center gap-2">
            <Copy size={18} />
            Copy
          </span>
        </button>

        <button
          type="button"
          onClick={clearText}
          className="rounded-xl bg-gray-300 py-3 font-semibold hover:bg-gray-400"
        >
          <span className="flex justify-center items-center gap-2">
            <Trash2 size={18} />
            Clear
          </span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="flex items-center gap-2 font-semibold text-blue-700">
          <Volume2 size={18} />
          Tips
        </h3>

        <ul className="mt-3 list-disc list-inside text-sm text-blue-600 space-y-2">
          <li>Speak clearly at a normal pace.</li>
          <li>Reduce background noise for better accuracy.</li>
          <li>Allow microphone access in your browser.</li>
          <li>Speech recognition may require an internet connection.</li>
        </ul>
      </div>
    </motion.div>
  );
}
