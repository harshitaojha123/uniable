import { useRef, useState } from "react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      setText((prev) => prev + " " + e.results[e.results.length - 1][0].transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => recognitionRef.current?.stop();

  return (
    <section className="mb-10">
      <h3 className="text-xl font-semibold mb-3">Speech to Text</h3>

      <div className="flex gap-4 mb-3">
        <button
          onClick={startListening}
          disabled={listening}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Stop
        </button>
      </div>

      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-3"
      />
    </section>
  );
}
