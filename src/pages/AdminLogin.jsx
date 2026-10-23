import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../utils/validation";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your admin email and password.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const result = login(email, password, "admin");

        if (!result.success) {
            setError("Invalid admin credentials.");
            return;
        }

        navigate("/admin-dashboard", { replace: true });
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Admin Login</h1>
                <p className="subtitle">
                    Authorized administrators only.
                </p>

                {error && <div className="error" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="admin-email">Admin Email</label>
                    <input
                        id="admin-email"
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter admin email"
                        required
                    />

                    <label htmlFor="admin-password">Password</label>
                    <input
                        id="admin-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        required
                    />

                    <button className="primary-button" type="submit">
                        Login as Admin
                    </button>
                </form>

                <p className="auth-footer">
                    <Link to="/">Back to Home</Link>
                </p>

                <p className="auth-footer">
                    Regular user? <Link to="/user-login">User Login</Link>
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;