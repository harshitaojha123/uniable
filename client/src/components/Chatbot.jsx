import { useState, useRef, useEffect } from "react";
import { Bot, Send, Mic, User } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm UniAble AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userText,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      let botReply = "Sorry, I couldn't understand that.";

      if (
        data?.candidates?.[0]?.content?.parts?.length
      ) {
        botReply = data.candidates[0].content.parts
          .map((p) => p.text)
          .join("");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ AI service is currently unavailable.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-xl border">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 flex items-center gap-3">

        <Bot size={28} />

        <div>

          <h2 className="text-xl font-bold">
            UniAble AI Assistant
          </h2>

          <p className="text-sm text-blue-100">
            Powered by Gemini
          </p>

        </div>

      </div>

      {/* Chat */}

      <div className="h-[500px] overflow-y-auto p-6 bg-slate-50">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-5 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`flex gap-3 max-w-[80%] ${
                msg.sender === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  msg.sender === "user"
                    ? "bg-blue-600"
                    : "bg-purple-600"
                }`}
              >
                {msg.sender === "user" ? (
                  <User size={18} />
                ) : (
                  <Bot size={18} />
                )}
              </div>

              <div
                className={`rounded-2xl px-5 py-4 shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>

            </div>

          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">

              <Bot size={18} />

            </div>

            <div className="bg-white rounded-2xl px-5 py-4 shadow">

              <div className="flex gap-2">

                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>

                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]"></span>

                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]"></span>

              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

      {/* Input */}

      <div className="border-t bg-white p-4">

        <div className="flex items-center gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask UniAble AI anything..."
            className="flex-1 rounded-xl border px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button
            className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
          >
            <Mic size={20} />
          </button>

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={18} />

            Send

          </button>

        </div>

      </div>

    </div>
  );
}