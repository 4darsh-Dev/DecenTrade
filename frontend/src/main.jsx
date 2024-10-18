import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WalletProvider } from "./context/WalletContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>
);
