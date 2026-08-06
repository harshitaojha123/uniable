import { motion } from "framer-motion";
import { useAccessibility } from "../../context/AccessibilityContext";
import {
  Eye,
  Ear,
  PersonStanding,
  Brain,
  HeartHandshake,
} from "lucide-react";

export default function DisabilitySelector() {
  const { setDisability } = useAccessibility();

  const options = [
    {
      id: "visual",
      label: "Visual Impairment",
      desc: "Screen reader, text-to-speech, and high contrast tools.",
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "hearing",
      label: "Hearing Impairment",
      desc: "Speech-to-text and visual communication support.",
      icon: Ear,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "mobility",
      label: "Mobility Impairment",
      desc: "Emergency assistance and accessible navigation.",
      icon: PersonStanding,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "learning",
      label: "Learning Disability",
      desc: "Reading assistance and dyslexia-friendly tools.",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "none",
      label: "Prefer not to say",
      desc: "Continue without selecting a specific accessibility need.",
      icon: HeartHandshake,
      color: "from-gray-500 to-slate-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">

      <div className="max-w-6xl w-full">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl shadow-xl">
            ♿
          </div>

          <h1 className="text-5xl font-black mt-8 text-gray-800">
            Personalize Your Experience
          </h1>

          <p className="text-gray-600 mt-5 text-lg max-w-3xl mx-auto">
            Choose the accessibility option that best matches your needs.
            This helps UniAble provide a more comfortable and inclusive
            experience.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {options.map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => setDisability(option.id)}
                className="bg-white rounded-3xl p-8 shadow-lg text-left border border-transparent hover:border-blue-500 transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center text-white mb-6`}
                >
                  <Icon size={30} />
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {option.label}
                </h2>

                <p className="text-gray-500 mt-4 leading-7">
                  {option.desc}
                </p>

                <div className="mt-8 text-blue-600 font-semibold flex items-center gap-2">
                  Continue →
                </div>
              </motion.button>
            );
          })}

        </div>

      </div>

    </div>
  );
}