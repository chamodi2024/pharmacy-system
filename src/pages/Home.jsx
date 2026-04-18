import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to Pharmacy Pro</h1>
        <p>Manage medicines, billing, and customer sales faster with an integrated inventory dashboard.</p>
        <div className="hero__actions">
          <Link to="/medicines" className="btn btn--primary">Browse Medicines</Link>
          <Link to="/billing" className="btn btn--secondary">Create Bill</Link>
        </div>
      </div>

      <div className="card-grid">
        <div className="feature-card">
          <h3>Inventory</h3>
          <p>View medicine stock, pricing, and quick add-to-cart actions.</p>
        </div>
        <div className="feature-card">
          <h3>Billing</h3>
          <p>Generate bills with patient details and calculate totals automatically.</p>
        </div>
        <div className="feature-card">
          <h3>History</h3>
          <p>Track past invoices and review sales records in one place.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1100px",
    margin: "0 auto"
  },
  hero: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    textAlign: "center"
  },
  buttons: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap"
  },
  button: {
    display: "inline-block",
    padding: "14px 26px",
    background: "#1976d2",
    color: "white",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "600"
  },
  outline: {
    background: "transparent",
    border: "2px solid #1976d2",
    color: "#1976d2"
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
    marginTop: "30px"
  },
  card: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.05)"
  }
};
