import { useRef, useState } from "react";
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
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);

    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      setText(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
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

      {/* Text */}

      <textarea
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your speech will appear here..."
        className="w-full rounded-2xl border border-gray-300 p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}

      <div className="grid md:grid-cols-4 gap-4 mt-8">

        <button
          onClick={startListening}
          disabled={listening}
          className="rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          <div className="flex justify-center items-center gap-2">
            <Mic size={18} />
            Start
          </div>
        </button>

        <button
          onClick={stopListening}
          disabled={!listening}
          className="rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          <div className="flex justify-center items-center gap-2">
            <MicOff size={18} />
            Stop
          </div>
        </button>

        <button
          onClick={copyText}
          className="rounded-xl bg-green-600 py-3 text-white font-semibold hover:bg-green-700"
        >
          <div className="flex justify-center items-center gap-2">
            <Copy size={18} />
            Copy
          </div>
        </button>

        <button
          onClick={() => setText("")}
          className="rounded-xl bg-gray-300 py-3 font-semibold hover:bg-gray-400"
        >
          <div className="flex justify-center items-center gap-2">
            <Trash2 size={18} />
            Clear
          </div>
        </button>

      </div>

      {/* Tips */}

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">

        <h3 className="flex items-center gap-2 font-semibold text-blue-700">
          <Volume2 size={18} />
          Tips
        </h3>

        <ul className="mt-3 list-disc list-inside text-sm text-blue-600 space-y-2">
          <li>Speak clearly and at a normal pace.</li>
          <li>Reduce background noise for better accuracy.</li>
          <li>Chrome browser provides the best speech recognition support.</li>
        </ul>

      </div>
    </motion.div>
  );
}