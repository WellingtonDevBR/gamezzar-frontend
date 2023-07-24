import { useAuth } from "../../context/AuthContext";
import { Route, Navigate, RouteProps } from "react-router-dom";

export function ProtectedRoute({ ...routeProps }: RouteProps) {
  const { token } = useAuth();

  if (!token) {
    return <Route {...routeProps} />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
