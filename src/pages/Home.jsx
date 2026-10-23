import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user, logout } = useAuth();

    return (
        <div className="home-page">
            <nav className="navbar">
                <Link className="brand" to="/">
                    Flexibility Cloud Services
                </Link>

                <div className="nav-links">
                    {user ? (
                        <>
                            <Link
                                to={
                                    user.role === "admin"
                                        ? "/admin-dashboard"
                                        : "/user-dashboard"
                                }
                            >
                                My Dashboard
                            </Link>
                            <button
                                className="logout-button"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/user-login">User Login</Link>
                            <Link to="/admin-login">Admin Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </div>
            </nav>

            <main className="hero">
                <p className="eyebrow">LEARN. BUILD. GROW.</p>
                <h1>Welcome to Flexibility Cloud Services</h1>
                <p>
                    Explore professional training programs and
                    develop skills in Java, React, Node.js, cloud
                    computing, and full-stack development.
                </p>

                <div className="hero-actions">
                    {user ? (
                        <Link
                            className="primary-button button-link"
                            to={
                                user.role === "admin"
                                    ? "/admin-dashboard"
                                    : "/user-dashboard"
                            }
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                className="primary-button button-link"
                                to="/signup"
                            >
                                Register as Student
                            </Link>
                            <Link
                                className="secondary-button"
                                to="/user-login"
                            >
                                User Login
                            </Link>
                            <Link
                                className="secondary-button"
                                to="/admin-login"
                            >
                                Admin Login
                            </Link>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Home;