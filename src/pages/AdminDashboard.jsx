import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/admin-login", { replace: true });
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
                <section className="welcome-card admin-banner">
                    <p className="eyebrow">ADMINISTRATION PORTAL</p>
                    <h1>Welcome, {user.name}!</h1>
                    <p>You are logged in with administrator access.</p>
                </section>

                <section className="dashboard-grid">
                    <article className="info-card">
                        <h3>Student Management</h3>
                        <p>Manage registrations and student records.</p>
                        <span className="status">Admin access</span>
                    </article>

                    <article className="info-card">
                        <h3>Training Management</h3>
                        <p>Manage courses, trainers, and schedules.</p>
                        <span className="status">Admin access</span>
                    </article>

                    <article className="info-card">
                        <h3>Account</h3>
                        <p>{user.email}</p>
                        <span className="status">
              <span className="status-dot"></span>
              Administrator
            </span>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;