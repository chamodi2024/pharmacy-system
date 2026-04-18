import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { label: "Overview", icon: "📊", tab: "overview" },
    { label: "Medicines", icon: "💊", tab: "medicines" },
    { label: "Billing", icon: "💳", tab: "billing" },
    { label: "Bill History", icon: "📋", tab: "history" },
    { label: "Cart", icon: "🛒", tab: "cart" },
    { label: "Admin", icon: "⚙️", tab: "admin" }
  ];

  return (
    <div className="dashboard-layout page">
      <aside className="dashboard-sidebar">
        <h3 className="dashboard-logo">Pharmacy Pro</h3>
        <div className="dashboard-menu">
          {menuItems.map(item => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={"dashboard-menu__item" + (activeTab === item.tab ? " active" : "")}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
        <button onClick={handleLogout} className="btn btn--danger full-width" style={{ marginTop: 20 }}>
          🚪 Logout
        </button>
      </aside>
      
      <main className="dashboard-content">
        <div className="section-card">
          <h2 className="section-title">Welcome to Pharmacy Dashboard</h2>
          <p>Select an option from the sidebar to navigate.</p>
        </div>
        
        <div className="card-grid">
          <div className="dashboard-card">
            <h3>💊 Medicines</h3>
            <p>Manage medicines inventory</p>
            <button onClick={() => navigate("/medicines")} className="btn btn--secondary">
              View
            </button>
          </div>
          
          <div className="dashboard-card">
            <h3>💳 Billing</h3>
            <p>Create and manage bills</p>
            <button onClick={() => navigate("/billing")} className="btn btn--secondary">
              View
            </button>
          </div>
          
          <div className="dashboard-card">
            <h3>📋 History</h3>
            <p>View billing history</p>
            <button onClick={() => navigate("/history")} className="btn btn--secondary">
              View
            </button>
          </div>
          
          <div className="dashboard-card">
            <h3>⚙️ Admin</h3>
            <p>Admin panel for management</p>
            <button onClick={() => navigate("/admin")} className="btn btn--secondary">
              View
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "calc(100vh - 56px)",
    background: "#f5f5f5"
  },
  sidebar: {
    width: "250px",
    background: "#2c3e50",
    color: "white",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
  },
  logo: {
    marginTop: 0,
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center"
  },
  menu: {
    marginBottom: "30px"
  },
  menuItem: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s"
  },
  logoutBtn: {
    width: "100%",
    padding: "10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px"
  },
  content: {
    flex: 1,
    padding: "30px"
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  cardBtn: {
    padding: "8px 16px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default Dashboard;