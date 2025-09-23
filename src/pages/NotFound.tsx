import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Redirect to dashboard instead of showing 404 as per requirements
  return <Navigate to="/dashboard" replace />;
};

export default NotFound;
