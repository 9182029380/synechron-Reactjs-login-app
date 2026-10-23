import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    validateEmail,
    getPasswordError,
} from "../utils/validation";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!email.trim() || !newPassword || !confirmPassword) {
            setError("Please complete all fields.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const passwordError = getPasswordError(newPassword);

        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = resetPassword(email, newPassword);

        if (!result.success) {
            setError(result.message);
            return;
        }

        setSuccess("Password updated. Redirecting to login...");

        setTimeout(() => {
            navigate("/user-login", { replace: true });
        }, 1200);
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Reset Password</h1>
                <p className="subtitle">
                    Enter your registered user email and choose a new password.
                </p>

                {error && <div className="error" role="alert">{error}</div>}

                {success && (
                    <div className="success-message" role="status">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="reset-email">Registered Email</label>
                    <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="Enter your registered email"
                        required
                    />

                    <label htmlFor="new-password">New Password</label>
                    <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Enter new password"
                        required
                    />

                    <label htmlFor="confirm-new-password">
                        Confirm New Password
                    </label>
                    <input
                        id="confirm-new-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                        required
                    />

                    <p className="field-hint">
                        Minimum 8 characters with uppercase, lowercase, number,
                        and special character.
                    </p>

                    <button className="primary-button" type="submit">
                        Reset Password
                    </button>
                </form>

                <p className="auth-footer">
                    Remembered your password? <Link to="/user-login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;