import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero__content">
          <p className="eyebrow">Community pharmacy workspace</p>
          <h1>Pharmacy Pro</h1>
          <p>Manage medicines, billing, stock checks, and daily customer service from one calm, fast workspace.</p>
          <div className="hero__actions">
            <Link to="/medicines" className="btn btn--primary">Browse Medicines</Link>
            <Link to="/billing" className="btn btn--secondary">Create Bill</Link>
          </div>
        </div>
      </div>

      <div className="home-strip">
        <div className="metric">
          <strong>24h</strong>
          <span>Token session for signed-in staff</span>
        </div>
        <div className="metric">
          <strong>3</strong>
          <span>Core workflows: stock, billing, history</span>
        </div>
        <div className="metric">
          <strong>1</strong>
          <span>Simple place for day-to-day counter work</span>
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
