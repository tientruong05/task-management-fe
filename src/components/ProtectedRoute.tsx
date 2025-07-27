import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

/**
 * A component that protects routes from unauthenticated access.
 * If the user is not authenticated, it redirects them to the authentication page.
 * Otherwise, it renders the child routes.
 * @returns A React element, either a `Navigate` component or an `Outlet` component.
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
