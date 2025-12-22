import { useState } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);

  const speak = () => {
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => window.speechSynthesis.cancel();

  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">Text to Speech</h3>

      <textarea
        rows={3}
        className="w-full border rounded p-3 mb-3"
        placeholder="Type text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 mb-3">
        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="border rounded"
        >
          <option value={0.7}>Slow</option>
          <option value={1}>Normal</option>
          <option value={1.3}>Fast</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={speak}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Speak
        </button>
        <button
          onClick={stop}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Stop
        </button>
      </div>
    </section>
  );
}
