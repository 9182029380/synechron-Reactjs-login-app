import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../utils/validation";

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const result = login(email, password, "user");

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/user-dashboard", { replace: true });
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>User Login</h1>
                <p className="subtitle">
                    Sign in to access your learning dashboard.
                </p>

                {error && <div className="error" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="user-email">Email</label>
                    <input
                        id="user-email"
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="user-password">Password</label>
                    <input
                        id="user-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />

                    <div className="form-links">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button className="primary-button" type="submit">
                        Login as User
                    </button>
                </form>

                <p className="auth-footer">
                    New student? <Link to="/signup">Create an account</Link>
                </p>

                <p className="auth-footer">
                    Are you an admin? <Link to="/admin-login">Admin Login</Link>
                </p>

                <p className="auth-footer">
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default UserLogin;