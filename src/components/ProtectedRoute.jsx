import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRole, children }) {
    const { user } = useAuth();

    if (!user) {
        return (
            <Navigate
                to={allowedRole === "admin" ? "/admin-login" : "/user-login"}
                replace
            />
        );
    }

    if (user.role !== allowedRole) {
        return (
            <Navigate
                to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;