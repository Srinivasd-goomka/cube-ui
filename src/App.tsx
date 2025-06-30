import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { authRoutes, nonAuthRoutes } from "./routes";
import { AuthProvider } from "./context/AuthProvider";
import { useAuthContext } from "./hooks/use-authContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const routes = useRoutes(isAuthenticated ? authRoutes : nonAuthRoutes);
  return routes;
};

const App: React.FC = () => {
  useEffect(() => {
    console.info(`Application running in ${import.meta.env.VITE_MODE} mode.`);
    console.info("Git Commit:", __COMMIT_HASH__);
    console.log("Commit Date:", __COMMIT_DATE__);
    window.scrollTo(0, 0);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer position="top-right" autoClose={2000} />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
