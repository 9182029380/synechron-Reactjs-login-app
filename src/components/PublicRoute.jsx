import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        return (
            <Navigate
                to={user.role === "admin"
                    ? "/admin-dashboard"
                    : "/user-dashboard"}
                replace
            />
        );
    }

    return children;
}

export default PublicRoute;