// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
        <h1>Create your account and start shopping smarter.</h1>
        <p>
          Track orders, save your cart across visits, and check out faster
          every time you come back.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2 className="auth-card-title">Sign up</h2>
          <p className="auth-card-subtitle">It only takes a minute.</p>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Jordan Lee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-primary">Create account</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;