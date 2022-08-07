import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const location = useLocation();

  return allowedRoles?.includes(userInfo?.role) ? (
    <Outlet />
  ) : userInfo?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
