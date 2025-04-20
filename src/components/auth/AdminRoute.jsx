import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/events" replace />;
  }

  // Admin access granted
  return <Outlet />;
};

export default AdminRoute;
