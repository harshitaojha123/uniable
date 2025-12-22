import { useState } from "react";
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

export default function Accessibility() {
  const { disability, resetDisability } = useAccessibility();
  const { user } = useAuth();

  const [showSOS, setShowSOS] = useState(false);

  // Ask first if not selected
  if (!disability) {
    return <DisabilitySelector />;
  }

  // 🔴 HANDLE SOS SUBMIT
  const handleSOSSubmit = (reason) => {
    const existing = JSON.parse(localStorage.getItem("sosAlerts")) || [];

    const newSOS = {
      id: Date.now(),
      email: user.email,
      disability,
      reason,
      time: new Date().toLocaleString(),
      status: "pending",
    };

    localStorage.setItem("sosAlerts", JSON.stringify([...existing, newSOS]));
  };

  return (
    <div className="p-6 pt-20 max-w-5xl mx-auto">
      {/* 🔁 CHANGE DISABILITY BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={resetDisability}
          className="text-sm text-blue-600 underline"
        >
          Change disability
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">
        Accessibility Tools
      </h2>

      {/* VISUAL */}
      {disability === "visual" && (
        <>
          <VisualSettings />
          <TextToSpeech />
        </>
      )}

      {/* HEARING */}
      {disability === "hearing" && (
        <>
          <SpeechToText />
        </>
      )}

      {/* MOBILITY */}
      {disability === "mobility" && (
        <>
          <TextToSpeech />
          <EmergencyMode />
        </>
      )}

      {/* LEARNING */}
      {disability === "learning" && (
        <>
          <FontControls />
          <TextToSpeech />
        </>
      )}

      {/* 🔴 COMMON SOS BUTTON (VISIBLE FOR ALL) */}
      <SOSButton onClick={() => setShowSOS(true)} />

      {/* 🔴 SOS MODAL */}
      {showSOS && (
        <SOSModal
          onClose={() => setShowSOS(false)}
          onSubmit={handleSOSSubmit}
        />
      )}
    </div>
  );
}
