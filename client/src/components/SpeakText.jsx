export default function SpeakText({ text }) {
  const speak = () => {
    if (!text) {
      alert("No text to speak");
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Optional settings (safe defaults)
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
    >
      🔊 Speak
    </button>
  );
}
