export default function VoiceInput({ onResult }) {
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className="mb-2 rounded bg-green-600 px-4 py-2 text-white"
    >
      🎤 Speak
    </button>
  );
}

