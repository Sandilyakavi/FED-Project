// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../utils/auth";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      localStorage.getItem("isAuthenticated") === "true";
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        // Signup validation
        if (!formData.username || !formData.email || !formData.password) {
          setError("Please fill all fields.");
          return;
        }

        if (!formData.email.endsWith("@gmail.com")) {
          setError(
            "Please enter a valid Gmail address (must end with @gmail.com)."
          );
          return;
        }

        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        const result = registerUser(
          formData.username,
          formData.email,
          formData.password
        );

        if (!result.success) {
          setError(result.message);
          return;
        }

        // Display user for dashboard
        localStorage.setItem(
          "user",
          JSON.stringify({ name: formData.username, email: formData.email })
        );
        navigate("/dashboard");
      } else {
        // Login validation
        if (!formData.username || !formData.password) {
          setError("Please enter username and password.");
          return;
        }

        const result = loginUser(formData.username, formData.password);

        if (!result.success) {
          setError(result.message);
          return;
        }

        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError("");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p>
            {isSignup
              ? "Join the FED dashboard and track your learning."
              : "Sign in to continue your dashboard journey."}
          </p>
          <div className="mode-pill">
            <span className={!isSignup ? "active" : ""}>Login</span>
            <span className={isSignup ? "active" : ""}>Signup</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <span className="input-label">Username</span>
            <div className="input-shell">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="auth-input"
                autoComplete="username"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {isSignup && (
            <div className="input-group">
              <span className="input-label">Email</span>
              <div className="input-shell">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                  className="auth-input"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <span className="input-label">Password</span>
            <div className="input-shell">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  isSignup ? "Create a password" : "Enter your password"
                }
                className="auth-input"
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {isSignup && (
            <div className="input-group">
              <span className="input-label">Confirm password</span>
              <div className="input-shell">
                <span className="input-icon">✅</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="auth-input"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" />
                {isSignup ? "Creating..." : "Signing in..."}
              </>
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isSignup ? "Already have an account?" : "New here?"}
            <button
              type="button"
              className="switch-btn"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isSignup ? "Sign In" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
