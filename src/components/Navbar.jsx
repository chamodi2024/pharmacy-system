import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">Pharmacy Pro</Link>
      </div>
      <div className="navbar__links">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/medicines" className="navbar__link">Medicines</Link>
        <Link to="/billing" className="navbar__link">Billing</Link>
        <Link to="/history" className="navbar__link">Bill History</Link>
        <Link to="/dashboard" className="navbar__link">Dashboard</Link>
        <Link to="/admin" className="navbar__link">Admin</Link>
        <Link to="/cart" className="navbar__link">Cart</Link>
        <Link to="/login" className="navbar__link">Login</Link>
      </div>
    </nav>
  );
}
