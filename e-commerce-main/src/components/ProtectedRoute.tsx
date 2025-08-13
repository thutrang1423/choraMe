import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authen/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { currentUser, loading, isAuthorized } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (!isAuthorized(allowedRoles))
    return <Navigate to="/unauthorized" replace />;

  return children;
}
