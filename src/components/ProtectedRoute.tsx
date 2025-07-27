import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
