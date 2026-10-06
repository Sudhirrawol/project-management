import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { LogoutUser, RefreshAccessToken } from "./api/auth.api";
import Login from "authMFE/Login";
// import ProjectApp from "projectMFE/Project"; // this is a static import
// User opens application
//        ↓
// Load necessary JavaScript
//        ↓
// Project MFE needed?
//        ↓
// Load Project MFE dynamically

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const ProjectApp = lazy(() => import("projectMFE/Project")); //projectApp can be loaded asynchronously

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await RefreshAccessToken();
        setAccessToken(data.accessToken);
      } catch (error) {
        setAccessToken(null);
      } finally {
        setCheckingAuth(false);
      }
    };
    restoreSession();
  }, []);
  const handleLoginSuccess = (accessToken: string) => {
    setAccessToken(accessToken);
    navigate("/dashboard");
  };
  const handleLogout = async () => {
    if (!accessToken) return;
    try {
      await LogoutUser(accessToken);
      setAccessToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  if (checkingAuth) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Project Management</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={accessToken ? "/dashboard" : "/login"} replace />
          }
        />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <div>
                <h2>Dashboard</h2>
                <Suspense fallback={<div>Loading project....</div>}>
                  {/* Suspense is a React component that lets you show temporary fallback UI while something below it is waiting to become ready. */}
                  <ProjectApp accessToken={accessToken} />
                </Suspense>

                <button onClick={handleLogout}>Logout</button>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={accessToken ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
