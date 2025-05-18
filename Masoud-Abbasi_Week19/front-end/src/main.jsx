import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import AppProvider from "./context/appProvider.jsx";
import App from "./App.jsx";
import "./Global.css";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </AppProvider>
);
