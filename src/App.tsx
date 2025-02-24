import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./lib/auth";
import TrainerDashboard from "./components/dashboard/TrainerDashboard";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./lib/auth";
import MyEvents from "./components/events/MyEvents";

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<TrainerDashboard />} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/my-events" element={<MyEvents />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </div>
    </Suspense>
  );
}

function App() {
  return <AppContent />;
}

export default App;
