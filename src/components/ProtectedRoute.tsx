import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
