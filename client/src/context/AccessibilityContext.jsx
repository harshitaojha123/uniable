import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {

  const [fontSize, setFontSize] = useState(
    Number(localStorage.getItem("fontSize")) || 16
  );

  const [highContrast, setHighContrast] = useState(
    JSON.parse(localStorage.getItem("highContrast")) || false
  );

  const [dyslexiaFont, setDyslexiaFont] = useState(
    JSON.parse(localStorage.getItem("dyslexiaFont")) || false
  );

  const [disability, setDisability] = useState(
    localStorage.getItem("disability") || null
  );

  const resetDisability = () => {
    setDisability(null);
    localStorage.removeItem("disability");
  };

  const resetAccessibility = () => {
    setFontSize(16);
    setHighContrast(false);
    setDyslexiaFont(false);

    localStorage.removeItem("fontSize");
    localStorage.removeItem("highContrast");
    localStorage.removeItem("dyslexiaFont");
  };

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;

    document.body.style.backgroundColor = highContrast
      ? "#000"
      : "";

    document.body.style.color = highContrast
      ? "#fff"
      : "";

    document.body.style.fontFamily = dyslexiaFont
      ? "Arial, sans-serif"
      : "";

    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem(
      "highContrast",
      JSON.stringify(highContrast)
    );
    localStorage.setItem(
      "dyslexiaFont",
      JSON.stringify(dyslexiaFont)
    );
  }, [fontSize, highContrast, dyslexiaFont]);

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

        resetDisability,
        resetAccessibility,
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