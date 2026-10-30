
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  BrainCircuit,
  MessageCircle,
  Mic,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";

const suggestions = [
  "How can I navigate the campus?",
  "Find the nearest accessible washroom",
  "Explain accessibility settings",
  "Emergency help information",
];

const features = [
  {
    title: "Smart Assistance",
    description:
      "Get guidance about accessibility, campus navigation, and university support.",
    icon: BrainCircuit,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    title: "Voice Enabled",
    description:
      "Use available voice recognition and text-to-speech tools.",
    icon: Mic,
    color: "text-purple-600",
    background: "bg-purple-50",
  },
  {
    title: "Support Resources",
    description:
      "Find helpful guidance and learn about available support options.",
    icon: MessageCircle,
    color: "text-green-600",
    background: "bg-green-50",
  },
];

export default function Ai() {
  const [suggestedMessage, setSuggestedMessage] = useState("");

  const handleSuggestion = (question) => {
    setSuggestedMessage(question);

    document.getElementById("uniable-chatbot")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-2xl sm:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-4">
                <Bot size={42} aria-hidden="true" />

                <h1 className="text-3xl font-black sm:text-5xl">
                  UniAble AI Assistant
                </h1>
              </div>

              <p className="mt-5 text-lg leading-8 text-blue-100">
                Ask questions, get accessibility guidance, explore
                campus facilities, and find support through the
                UniAble AI assistant.
              </p>

              <div className="mt-7">
                <a
                  href="#uniable-chatbot"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
                >
                  Start a Conversation
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="hidden h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-lg lg:flex">
              <Sparkles size={46} aria-hidden="true" />
            </div>
          </div>
        </motion.section>

        {/* Feature Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white p-7 shadow-lg transition-shadow hover:shadow-xl sm:p-8"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.background} ${feature.color}`}
                >
                  <Icon size={30} aria-hidden="true" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {feature.title}
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </section>

        {/* Suggested Questions */}
        <section className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Suggested Questions
          </h2>

          <p className="mt-2 text-gray-500">
            Select a question to start a conversation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleSuggestion(question)}
                className="rounded-full border border-blue-100 bg-blue-50 px-5 py-3 text-left font-medium text-blue-800 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {question}
              </button>
            ))}
          </div>
        </section>

        {/* Chatbot */}
        <section
          id="uniable-chatbot"
          className="scroll-mt-6 overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-bold sm:text-2xl">
              <Bot size={26} aria-hidden="true" />
              Chat with UniAble AI
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              Ask about accessibility, campus resources, or support.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <Chatbot
              suggestedMessage={suggestedMessage}
              onSuggestedMessageHandled={() =>
                setSuggestedMessage("")
              }
            />
          </div>
        </section>

        {/* Campus Map Link */}
        <section className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-blue-100 bg-white p-6 shadow-md sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Looking for campus facilities?
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              Open the campus map to explore reported accessibility
              locations and available facilities.
            </p>
          </div>

          <Link
            to="/campus"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Open Campus Map
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}
