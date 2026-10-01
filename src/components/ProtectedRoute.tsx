import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../service/authService";
import { hasRole } from "../service/authService";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole !== undefined && !hasRole(requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
