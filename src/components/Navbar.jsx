import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate("/login");
  };

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
        <Link to="/signup" className="navbar__link">Sign Up</Link>
        <Link to="/login" className="navbar__link">Login</Link>
        <button type="button" onClick={handleLogout} className="navbar__link">
          Logout
        </button>
      </div>
    </nav>
  );
}
