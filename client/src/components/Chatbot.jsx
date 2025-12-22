import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your AI assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText }
    ]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userText }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      console.log("Gemini raw response:", data);


      let botReply = "Sorry, I couldn’t understand that.";

if (
  data &&
  data.candidates &&
  data.candidates.length > 0 &&
  data.candidates[0].content &&
  data.candidates[0].content.parts &&
  data.candidates[0].content.parts.length > 0
) {
  botReply = data.candidates[0].content.parts
    .map((p) => p.text)
    .join("");
}


      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botReply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "AI service is currently unavailable."
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto mt-6 max-w-md rounded bg-white shadow">
      <div className="border-b p-4 text-xl font-bold">
        AI Assistant
      </div>

      <div className="h-64 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block rounded px-3 py-2 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <div className="text-left text-sm text-gray-500">
            AI is typing...
          </div>
        )}
      </div>

      <div className="flex border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded border p-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 rounded bg-blue-600 px-4 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
