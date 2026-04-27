import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setAuthToken } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ email: trimmedEmail, password });
      const token = result.token;
      if (token) {
        localStorage.setItem("pharmacy_token", token);
        setAuthToken(token);
        setSuccess("Login successful. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form-card form-stack">
        <form className="form-stack" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn btn--primary full-width" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
          <p style={{ marginTop: 12, textAlign: "center", color: "#475569" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
