import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Panel from "./pages/Panel.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Page404 from "./pages/Page404.jsx";
import { useApp } from "./context/appProvider";

const queryClient = new QueryClient();
function App() {
  const { state } = useApp();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                state.isAuthenticated ? <Panel /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={state.isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
