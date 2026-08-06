import { useState } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "../context/AccessibilityContext";
import { useAuth } from "../context/AuthContext";

import DisabilitySelector from "../components/accessibility/DisabilitySelector";
import FontControls from "../components/accessibility/FontControls";
import SpeechToText from "../components/accessibility/SpeechToText";
import TextToSpeech from "../components/accessibility/TextToSpeech";
import VisualSettings from "../components/accessibility/VisualSettings";
import EmergencyMode from "../components/accessibility/EmergencyMode";
import SOSButton from "../components/accessibility/SOSButton";
import SOSModal from "../components/accessibility/SOSModal";

import {
  
  Eye,
  Ear,
  Brain,
  PersonStanding,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";

export default function Accessibility() {
  const { disability, resetDisability } = useAccessibility();
  const { user } = useAuth();

  const [showSOS, setShowSOS] = useState(false);

  if (!disability) {
    return <DisabilitySelector />;
  }

  const handleSOSSubmit = (reason) => {
    const existing =
      JSON.parse(localStorage.getItem("sosAlerts")) || [];

    existing.push({
      id: Date.now(),
      email: user.email,
      disability,
      reason,
      time: new Date().toLocaleString(),
      status: "pending",
    });

    localStorage.setItem(
      "sosAlerts",
      JSON.stringify(existing)
    );
  };

  const disabilityInfo = {
    visual: {
      icon: <Eye size={32} />,
      color: "from-blue-500 to-cyan-500",
      title: "Visual Accessibility",
    },
    hearing: {
      icon: <Ear size={32} />,
      color: "from-green-500 to-emerald-500",
      title: "Hearing Accessibility",
    },
    mobility: {
      icon: <PersonStanding size={32} />,
      color: "from-orange-500 to-red-500",
      title: "Mobility Accessibility",
    },
    learning: {
      icon: <Brain size={32} />,
      color: "from-purple-500 to-indigo-500",
      title: "Learning Accessibility",
    },
  };

  const info = disabilityInfo[disability];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl bg-gradient-to-r ${info.color} text-white p-10 shadow-2xl`}
        >

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div>

              <div className="flex items-center gap-4">

                {info.icon}

                <h1 className="text-4xl font-black">
                  {info.title}
                </h1>

              </div>

              <p className="mt-5 text-lg opacity-90 max-w-2xl">
                Configure your accessibility tools to personalize
                your campus experience.
              </p>

            </div>

            <button
              onClick={resetDisability}
              className="flex items-center gap-2 rounded-xl bg-white text-gray-800 px-5 py-3 font-semibold hover:scale-105 transition"
            >
              <RotateCcw size={18} />

              Change Disability

            </button>

          </div>

        </motion.div>

        {/* Tools */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {disability === "visual" && (
            <>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Eye className="text-blue-600" />
                  Visual Settings
                </h2>

                <VisualSettings />
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Text To Speech
                </h2>

                <TextToSpeech />
              </motion.div>
            </>
          )}

          {disability === "hearing" && (
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-lg p-8 lg:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-6">
                Speech To Text
              </h2>

              <SpeechToText />
            </motion.div>
          )}

          {disability === "mobility" && (
            <>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Text To Speech
                </h2>

                <TextToSpeech />
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Emergency Mode
                </h2>

                <EmergencyMode />
              </motion.div>
            </>
          )}

          {disability === "learning" && (
            <>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Reading Settings
                </h2>

                <FontControls />
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Text To Speech
                </h2>

                <TextToSpeech />
              </motion.div>
            </>
          )}

        </div>

        {/* Emergency */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 rounded-3xl bg-gradient-to-r from-red-500 to-red-700 p-8 text-white shadow-xl"
        >

          <div className="flex justify-between items-center flex-wrap gap-6">

            <div>

              <div className="flex items-center gap-3">

                <ShieldAlert size={32} />

                <h2 className="text-3xl font-bold">
                  Emergency SOS
                </h2>

              </div>

              <p className="mt-4 opacity-90">
                If you need immediate assistance, press the SOS
                button to notify the administration team instantly.
              </p>

            </div>

            <SOSButton onClick={() => setShowSOS(true)} />

          </div>

        </motion.div>

      </div>

      {showSOS && (
        <SOSModal
          onClose={() => setShowSOS(false)}
          onSubmit={handleSOSSubmit}
        />
      )}
    </div>
  );
}