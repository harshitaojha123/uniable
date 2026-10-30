
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Ear,
  Brain,
  PersonStanding,
  RotateCcw,
  ShieldAlert,
  CheckCircle,
  MapPinned,
} from "lucide-react";

import { useAccessibility } from "../context/AccessibilityContext";
import { useAuth } from "../context/AuthContext";

import DisabilitySelector from "../components/accessibility/DisabilitySelector";
import FontControls from "../components/accessibility/FontControls";
import SpeechToText from "../components/accessibility/SpeechToText";
import TextToSpeech from "../components/accessibility/TextToSpeech";
import VisualSettings from "../components/accessibility/VisualSettings";
import SOSButton from "../components/accessibility/SOSButton";
import SOSModal from "../components/accessibility/SOSModal";

const disabilityInfo = {
  visual: {
    icon: Eye,
    color: "from-blue-500 to-cyan-500",
    title: "Visual Accessibility",
    description:
      "Personalize visual settings and use audio tools to access digital content more comfortably.",
  },
  hearing: {
    icon: Ear,
    color: "from-green-500 to-emerald-500",
    title: "Hearing Accessibility",
    description:
      "Use speech-to-text tools to make spoken information easier to access.",
  },
  mobility: {
    icon: PersonStanding,
    color: "from-orange-500 to-red-500",
    title: "Mobility Accessibility",
    description:
      "Explore tools and campus resources designed to support accessible experiences.",
  },
  learning: {
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    title: "Learning Accessibility",
    description:
      "Personalize reading settings and use audio tools to support your learning experience.",
  },
};

const mobilityGuides = [
  {
    title: "Accessible Campus Facilities",
    description:
      "Look for accessible entrances, ramps, elevators, and other campus facilities.",
    icon: PersonStanding,
    color: "bg-blue-100 text-blue-700",
    background: "bg-blue-50",
  },
  {
    title: "Request Assistance",
    description:
      "Report accessibility barriers or request help through the available campus support system.",
    icon: ShieldAlert,
    color: "bg-purple-100 text-purple-700",
    background: "bg-purple-50",
  },
  {
    title: "Personalized Experience",
    description:
      "Use the available accessibility tools to interact with digital content more comfortably.",
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
    background: "bg-green-50",
  },
];

function ToolCard({ title, children, className = "" }) {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl bg-white p-6 shadow-lg sm:p-8 ${className}`}
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {title}
      </h2>

      {children}
    </motion.section>
  );
}

function MobilityGuide() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg sm:p-8"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <PersonStanding size={30} aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Accessibility Quick Guide
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Helpful tools and campus support
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {mobilityGuides.map((guide) => {
          const Icon = guide.icon;

          return (
            <div
              key={guide.title}
              className={`flex gap-4 rounded-2xl p-4 ${guide.background}`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${guide.color}`}
              >
                <Icon size={23} aria-hidden="true" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {guide.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {guide.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="/campus"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Explore Campus Map
        <MapPinned size={19} aria-hidden="true" />
      </a>
    </motion.section>
  );
}

export default function Accessibility() {
  const { disability, resetDisability } = useAccessibility();
  const { user } = useAuth();

  const [showSOS, setShowSOS] = useState(false);
  const [sosError, setSosError] = useState("");

  if (!disability || !disabilityInfo[disability]) {
    return <DisabilitySelector />;
  }

  const handleSOSSubmit = (reason) => {
    try {
      const storedAlerts = JSON.parse(
        localStorage.getItem("sosAlerts") || "[]"
      );

      const existing = Array.isArray(storedAlerts)
        ? storedAlerts
        : [];

      const newAlert = {
        id: Date.now(),
        email: user?.email || "Unknown user",
        disability,
        reason,
        time: new Date().toLocaleString(),
        status: "pending",
      };

      localStorage.setItem(
        "sosAlerts",
        JSON.stringify([...existing, newAlert])
      );

      setSosError("");
      setShowSOS(false);
    } catch (error) {
      console.error("Unable to save SOS alert:", error);
      setSosError(
        "Unable to save your SOS alert. Please try again."
      );
    }
  };

  const info = disabilityInfo[disability];
  const HeaderIcon = info.icon;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-3xl bg-gradient-to-r ${info.color} p-6 text-white shadow-2xl sm:p-10`}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <HeaderIcon size={36} aria-hidden="true" />

                <h1 className="text-3xl font-black sm:text-4xl">
                  {info.title}
                </h1>
              </div>

              <p className="mt-5 max-w-2xl text-lg leading-8 opacity-90">
                {info.description}
              </p>
            </div>

            <button
              type="button"
              onClick={resetDisability}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-gray-800 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <RotateCcw size={18} aria-hidden="true" />
              Change Disability
            </button>
          </div>
        </motion.section>

        {/* Accessibility Tools */}
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Visual Accessibility */}
          {disability === "visual" && (
            <>
              <ToolCard title="Visual Settings">
                <VisualSettings />
              </ToolCard>

              <ToolCard title="Text to Speech">
                <TextToSpeech />
              </ToolCard>
            </>
          )}

          {/* Hearing Accessibility */}
          {disability === "hearing" && (
            <ToolCard
              title="Speech to Text"
              className="lg:col-span-2"
            >
              <SpeechToText />
            </ToolCard>
          )}

          {/* Mobility Accessibility */}
          {disability === "mobility" && (
            <>
              <ToolCard title="Text to Speech">
                <TextToSpeech />
              </ToolCard>

              <MobilityGuide />
            </>
          )}

          {/* Learning Accessibility */}
          {disability === "learning" && (
            <>
              <ToolCard title="Reading Settings">
                <FontControls />
              </ToolCard>

              <ToolCard title="Text to Speech">
                <TextToSpeech />
              </ToolCard>
            </>
          )}
        </div>

        {/* Emergency SOS */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-red-500 to-red-700 p-6 text-white shadow-xl sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <ShieldAlert size={32} aria-hidden="true" />

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Emergency SOS
                </h2>
              </div>

              <p className="mt-4 leading-7 opacity-90">
                Need assistance? Submit an SOS alert with details
                so the administration team can review your request.
              </p>
            </div>

            <SOSButton onClick={() => setShowSOS(true)} />
          </div>
        </motion.section>

        {/* SOS Save Error */}
        {sosError && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {sosError}
          </p>
        )}
      </div>

      {/* SOS Modal */}
      {showSOS && (
        <SOSModal
          onClose={() => setShowSOS(false)}
          onSubmit={handleSOSSubmit}
        />
      )}
    </main>
  );
}
