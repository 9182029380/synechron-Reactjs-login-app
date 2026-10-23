import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className="dashboard-page">
            <nav className="navbar">
                <h2>My Dashboard</h2>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>

            <main className="dashboard-content">
                <section className="welcome-card">
                    <p className="eyebrow">YOUR ACCOUNT</p>
                    <h1>Welcome, {user.name}!</h1>
                    <p>
                        You have successfully logged in to your account.
                    </p>
                </section>

                <section className="dashboard-grid">
                    <article className="info-card">
                        <h3>Profile</h3>
                        <p>Your registered account details.</p>
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
                        <h3>Account Status</h3>
                        <p>Your current session information.</p>
                        <div className="status">
                            <span className="status-dot"></span>
                            Logged In
                        </div>
                    </article>

                    <article className="info-card">
                        <h3>Quick Actions</h3>
                        <p>You can manage your demo account here.</p>
                        <button
                            className="primary-button"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;