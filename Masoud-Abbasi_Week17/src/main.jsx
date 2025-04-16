import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContactsProvider from "./context/ContactsProvider.jsx";


import "./Global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ContactsProvider>
    <App />
  </ContactsProvider>
  /* </StrictMode>, */
);
