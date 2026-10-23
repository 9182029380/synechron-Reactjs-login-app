import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";

function RootRedirect() {
    const { user } = useAuth();

    if (!user) {
        return <Home />;
    }

    return (
        <Navigate
            to={
                user.role === "admin"
                    ? "/admin-dashboard"
                    : "/user-dashboard"
            }
            replace
        />
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootRedirect />} />

                    <Route path="/home" element={<Home />} />

                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <Signup />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/user-login"
                        element={
                            <PublicRoute>
                                <UserLogin />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/admin-login"
                        element={
                            <PublicRoute>
                                <AdminLogin />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={
                            <PublicRoute>
                                <ForgotPassword />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute allowedRole="user">
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;