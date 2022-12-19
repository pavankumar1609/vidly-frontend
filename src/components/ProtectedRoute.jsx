import { Navigate, Outlet, useLocation } from "react-router-dom";
import auth from "../services/authService";

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!auth.getCurrentUser())
    return <Navigate replace state={{ from: location }} to="/login" />;

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
