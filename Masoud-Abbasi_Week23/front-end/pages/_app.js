import { ToastContainer } from "react-toastify";
import AppProvider from "@/context/AppProvider.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/Global.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
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
      </QueryClientProvider>
    </AppProvider>
  );
}
