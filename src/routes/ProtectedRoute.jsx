import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children }) => {
  const location = useLocation();

  if (!isAuth) {
    // Сохраняем в state текущий путь (from), чтобы потом вернуться сюда
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;