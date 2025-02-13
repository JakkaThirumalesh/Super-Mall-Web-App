import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BioProvider } from "./hooks/Context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>
      <BioProvider>
        <App />
      </BioProvider>
    </StrictMode>
  </>
);
