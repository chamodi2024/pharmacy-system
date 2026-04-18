import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setAuthToken } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const result = await login({ email, password });
      const token = result.token;
      if (token) {
        localStorage.setItem("pharmacy_token", token);
        setAuthToken(token);
        navigate("/dashboard");
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
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
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
        <button onClick={handleSubmit} className="btn btn--primary full-width" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 100px)",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "16px",
    background: "white",
    boxShadow: "0 16px 40px rgba(0,0,0,0.08)"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #dfe3e8"
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px"
  },
  error: {
    background: "#fdecea",
    color: "#b71c1c",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "16px"
  }
};
