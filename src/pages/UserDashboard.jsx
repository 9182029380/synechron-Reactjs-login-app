import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/user-login", { replace: true });
    }

    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <Link className="brand" to="/">Flexibility Cloud Services</Link>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            <main className="dashboard-content">
                <section className="welcome-card user-banner">
                    <p className="eyebrow">STUDENT PORTAL</p>
                    <h1>Welcome, {user.name}!</h1>
                    <p>You are logged in as a student.</p>
                </section>

                <section className="dashboard-grid">
                    <article className="info-card">
                        <h3>My Profile</h3>
                        <p>View your registered details.</p>
                        <div className="detail-row">
                            <span>Name</span>
                            <strong>{user.name}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Email</span>
                            <strong>{user.email}</strong>
                        </div>
                    </article>

                    <article className="info-card">
                        <h3>My Training</h3>
                        <p>Your learning area is ready.</p>
                        <div className="status">
                            <span className="status-dot"></span>
                            Account Active
                        </div>
                        <p className="field-hint">
                            Course enrollment can be added in the next step.
                        </p>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default UserDashboard;