// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      onLogin(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <p className="auth-panel-eyebrow">Amazon Clone</p>
        <h1>Welcome back. Your cart missed you.</h1>
        <p>
          Log in to pick up where you left off and keep checkout quick.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2 className="auth-card-title">Log in</h2>
          <p className="auth-card-subtitle">Enter your details to continue.</p>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-primary">Log in</button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;