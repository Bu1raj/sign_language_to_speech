import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UniqueLabelsProvider from "./contexts/UniqueLabelsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UniqueLabelsProvider>
      <App />
    </UniqueLabelsProvider>
  </StrictMode>
);
