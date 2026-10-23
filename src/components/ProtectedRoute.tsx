import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking login...</p>;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole !== undefined && !user.roles.includes(requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
