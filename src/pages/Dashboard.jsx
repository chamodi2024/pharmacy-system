import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    setAuthToken(null);
    navigate("/login");
  };

  const menuItems = [
    { label: "Overview", tab: "overview" },
    { label: "Medicines", tab: "medicines", path: "/medicines" },
    { label: "Billing", tab: "billing", path: "/billing" },
    { label: "Bill History", tab: "history", path: "/history" },
    { label: "Cart", tab: "cart", path: "/cart" },
    { label: "Admin", tab: "admin", path: "/admin" }
  ];

  const cards = [
    { title: "Medicines", text: "Check stock, prices, and cart actions.", path: "/medicines" },
    { title: "Billing", text: "Create patient bills with selected medicines.", path: "/billing" },
    { title: "History", text: "Review saved invoices and sales records.", path: "/history" },
    { title: "Admin", text: "Manage operational settings and medicine data.", path: "/admin" }
  ];

  const handleMenuClick = (item) => {
    setActiveTab(item.tab);
    if (item.path) navigate(item.path);
  };

  return (
    <div className="dashboard-layout page">
      <aside className="dashboard-sidebar">
        <h3 className="dashboard-logo">Pharmacy Pro</h3>
        <div className="dashboard-menu">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleMenuClick(item)}
              className={"dashboard-menu__item" + (activeTab === item.tab ? " active" : "")}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={handleLogout} className="btn btn--danger full-width" style={{ marginTop: 18 }}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <div className="section-card">
          <p className="eyebrow" style={{ color: "#0f766e" }}>Daily overview</p>
          <h2 className="section-title">Welcome to your pharmacy dashboard</h2>
          <p>Choose a workflow below and keep the most common counter tasks close at hand.</p>
        </div>

        <div className="dashboard-summary">
          <div className="metric">
            <strong>Stock</strong>
            <span>Browse medicine availability</span>
          </div>
          <div className="metric">
            <strong>Bills</strong>
            <span>Create clear patient invoices</span>
          </div>
          <div className="metric">
            <strong>Sales</strong>
            <span>Track recent billing history</span>
          </div>
        </div>

        <div className="card-grid">
          {cards.map((card) => (
            <div className="dashboard-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <button onClick={() => navigate(card.path)} className="btn btn--secondary">
                Open
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
