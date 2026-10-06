import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  accessToken: string | null;
  children: React.ReactNode;
}

function ProtectedRoute({ accessToken, children }: ProtectedRouteProps) {
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
