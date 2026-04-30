import { Link, NavLink, useNavigate } from "react-router-dom";
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
        <NavLink to="/" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Home</NavLink>
        <NavLink to="/medicines" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Medicines</NavLink>
        <NavLink to="/billing" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Billing</NavLink>
        <NavLink to="/history" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Bill History</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Dashboard</NavLink>
        <NavLink to="/admin" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Admin</NavLink>
        <NavLink to="/cart" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Cart</NavLink>
        <NavLink to="/signup" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Sign Up</NavLink>
        <NavLink to="/login" className={({ isActive }) => "navbar__link" + (isActive ? " active" : "")}>Login</NavLink>
        <button type="button" onClick={handleLogout} className="navbar__link">
          Logout
        </button>
      </div>
    </nav>
  );
}
