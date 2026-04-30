import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, setAuthToken } from "../services/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await register({ username: trimmedUsername, email: trimmedEmail, password });
      if (result?.token) {
        setAuthToken(result.token);
        setSuccess("Account created successfully. Redirecting...");
        setTimeout(() => navigate("/dashboard"), 800);
        return;
      }

      setSuccess("Account created successfully. Redirecting to login...");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err?.response?.data?.message ||
          err?.response?.statusText ||
          err?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <section className="auth-photo">
        <div>
          <p className="eyebrow">New staff account</p>
          <h1>Start with a clean workspace for pharmacy operations.</h1>
          <p>Create an account and continue straight into the dashboard after registration.</p>
        </div>
      </section>

      <div className="form-card form-stack">
        <form className="form-stack" onSubmit={handleSubmit}>
          <h2>Create account</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />

          <button type="submit" className="btn btn--primary full-width" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p style={{ marginTop: 12, textAlign: "center", color: "#475569" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
