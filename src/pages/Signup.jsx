import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    validateEmail,
    getPasswordError,
} from "../utils/validation";

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError("All fields are required.");
            return;
        }

        if (!validateEmail(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const passwordError = getPasswordError(form.password);

        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const result = signup(
            form.name,
            form.email,
            form.password
        );

        if (!result.success) {
            setError(result.message);
            return;
        }

        navigate("/user-dashboard", { replace: true });
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Student Registration</h1>
                <p className="subtitle">
                    Create an account to access training programs.
                </p>

                {error && <div className="error" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        autoComplete="name"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        required
                    />

                    <p className="field-hint">
                        Use uppercase, lowercase, a number, and a special character.
                    </p>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        required
                    />

                    <button className="primary-button" type="submit">
                        Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already registered? <Link to="/user-login">Login</Link>
                </p>

                <p className="auth-footer">
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;