
import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, Send, Mic, User, Square } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Chatbot({
  suggestedMessage = "",
  onSuggestedMessageHandled,
}) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm UniAble AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const requestInProgressRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (messageText = input) => {
      const userText = messageText.trim();

      if (!userText || requestInProgressRef.current) return;

      requestInProgressRef.current = true;
      setLoading(true);
      setInput("");

      setMessages((previous) => [
        ...previous,
        { sender: "user", text: userText },
      ]);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/openai/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userText }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "The AI assistant could not respond."
          );
        }

        setMessages((previous) => [
          ...previous,
          {
            sender: "bot",
            text:
              data.reply ||
              "I couldn't generate a response. Please try again.",
          },
        ]);
      } catch (error) {
        console.error("UniAble AI request failed:", error);

        setMessages((previous) => [
          ...previous,
          {
            sender: "bot",
            text:
              error.message ||
              "The AI service is unavailable. Please try again.",
          },
        ]);
      } finally {
        requestInProgressRef.current = false;
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [input]
  );

  // Automatically send a question selected on the AI page.
  useEffect(() => {
    if (!suggestedMessage?.trim()) return;

    sendMessage(suggestedMessage);
    onSuggestedMessageHandled?.();
  }, [suggestedMessage, sendMessage, onSuggestedMessageHandled]);

  // Release the microphone if the component is unmounted.
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleVoiceInput = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text:
            "Voice input is not supported in this browser. Try a recent version of Chrome or Edge.",
        },
      ]);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput((previous) =>
        previous ? `${previous} ${transcript}` : transcript
      );
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
        <Bot size={28} aria-hidden="true" />

        <div>
          <h2 className="text-xl font-bold">
            UniAble AI Assistant
          </h2>

          <p className="text-sm text-blue-100">
            Powered by OpenAI
          </p>
        </div>

        <span className="ml-auto rounded-full bg-white/20 px-3 py-1 text-xs">
          {loading ? "Thinking..." : "Ready"}
        </span>
      </div>

      {/* Messages */}
      <div
        className="h-[500px] space-y-5 overflow-y-auto bg-slate-50 p-4 sm:p-6"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((message, index) => {
          const isUser = message.sender === "user";

          return (
            <div
              key={`${index}-${message.sender}`}
              className={`mb-5 flex ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[90%] gap-3 sm:max-w-[80%] ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
                    isUser ? "bg-blue-600" : "bg-purple-600"
                  }`}
                >
                  {isUser ? (
                    <User size={18} aria-hidden="true" />
                  ) : (
                    <Bot size={18} aria-hidden="true" />
                  )}
                </div>

                <div
                  className={`whitespace-pre-wrap break-words rounded-2xl px-5 py-4 shadow-sm ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div
            className="flex items-center gap-3"
            role="status"
            aria-label="UniAble AI is generating a response"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
              <Bot size={18} aria-hidden="true" />
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <div className="flex gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t bg-white p-4"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask UniAble AI anything..."
            aria-label="Message for UniAble AI"
            disabled={loading}
            className="min-w-0 flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 sm:px-5"
          />

          <button
            type="button"
            onClick={toggleVoiceInput}
            disabled={loading}
            aria-label={
              listening ? "Stop voice input" : "Start voice input"
            }
            title={
              listening ? "Stop voice input" : "Start voice input"
            }
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition disabled:opacity-50 ${
              listening
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {listening ? (
              <Square size={18} aria-hidden="true" />
            ) : (
              <Mic size={20} aria-hidden="true" />
            )}
          </button>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
          >
            <Send size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Voice input requires browser permission and a supported browser.
        </p>
      </form>
    </div>
  );
}
