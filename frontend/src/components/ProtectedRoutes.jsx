import { Navigate } from "react-router-dom";

// Navigate

const ProtectedRoutes = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/" replace />; // replace will replace the current route in the history stack
  }
  return children;
};

export default ProtectedRoutes;
