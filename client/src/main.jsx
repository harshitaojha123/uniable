import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import "leaflet/dist/leaflet.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AccessibilityProvider>
      <App />
      </AccessibilityProvider>
    </AuthProvider>
  </BrowserRouter>
);

