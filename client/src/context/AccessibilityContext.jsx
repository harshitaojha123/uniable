import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  // 🔹 EXISTING STATES
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  // 🔹 NEW: DISABILITY STATE
  const [disability, setDisability] = useState(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("disability");
  });
const resetDisability = () => {
  setDisability(null);
  localStorage.removeItem("disability");
};


  // 🔹 APPLY VISUAL SETTINGS
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.body.style.fontSize = fontSize + "px";
    document.body.style.backgroundColor = highContrast ? "#000" : "";
    document.body.style.color = highContrast ? "#fff" : "";
    document.body.style.fontFamily = dyslexiaFont
      ? "Arial, sans-serif"
      : "";
  }, [fontSize, highContrast, dyslexiaFont]);

  // 🔹 SAVE DISABILITY PREFERENCE
  useEffect(() => {
    if (disability) {
      localStorage.setItem("disability", disability);
    }
  }, [disability]);

  return (
    <AccessibilityContext.Provider
    value={{
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  dyslexiaFont,
  setDyslexiaFont,
  disability,
  setDisability,
  resetDisability,   // 👈 ADD THIS
}}

    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used inside AccessibilityProvider"
    );
  }
  return context;
};
