import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  BrainCircuit,
  MessageCircle,
  Mic,
} from "lucide-react";

import Chatbot from "../components/Chatbot";

const suggestions = [
  "How can I navigate the campus?",
  "Find the nearest accessible washroom",
  "Explain accessibility settings",
  "Emergency help information",
];

export default function Ai() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl"
        >

          <div className="flex flex-wrap justify-between items-center gap-6">

            <div>

              <div className="flex items-center gap-4">

                <Bot size={44} />

                <h1 className="text-5xl font-black">
                  UniAble AI Assistant
                </h1>

              </div>

              <p className="mt-5 text-lg text-blue-100 max-w-3xl leading-8">
                Ask questions, get accessibility guidance, locate campus
                facilities, and receive instant support through our AI-powered
                assistant.
              </p>

            </div>

            <div className="hidden lg:flex h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-lg items-center justify-center">
              <Sparkles size={50} />
            </div>

          </div>

        </motion.div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <BrainCircuit className="text-blue-600 mb-5" size={34} />

            <h2 className="text-2xl font-bold">
              Smart Assistance
            </h2>

            <p className="text-gray-600 mt-3">
              Get instant answers related to accessibility,
              campus navigation and university support.
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <Mic className="text-purple-600 mb-5" size={34} />

            <h2 className="text-2xl font-bold">
              Voice Enabled
            </h2>

            <p className="text-gray-600 mt-3">
              Speak naturally with voice recognition and
              text-to-speech support.
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <MessageCircle
              className="text-green-600 mb-5"
              size={34}
            />

            <h2 className="text-2xl font-bold">
              24 × 7 Support
            </h2>

            <p className="text-gray-600 mt-3">
              Receive guidance whenever you need it,
              without waiting for office hours.
            </p>

          </motion.div>

        </div>

        {/* Suggested Prompts */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Suggested Questions
          </h2>

          <div className="flex flex-wrap gap-4">

            {suggestions.map((item) => (
              <button
                key={item}
                className="rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white transition px-5 py-3 font-medium"
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        {/* Chatbot */}

        <div className="mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5">

            <h2 className="text-2xl font-bold flex items-center gap-3">

              <Bot />

              Chat with UniAble AI

            </h2>

          </div>

          <div className="p-6">

            <Chatbot />

          </div>

        </div>

      </div>

    </div>
  );
}
