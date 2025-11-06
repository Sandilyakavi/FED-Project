import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // ✅ Check login state on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("userAccount"));

    if (isSignup) {
      // Signup flow
      if (!formData.username || !formData.password) {
        setError("Please fill in all fields.");
        return;
      }
      localStorage.setItem("userAccount", JSON.stringify(formData));
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      alert("Account created successfully 🎉");
      navigate("/dashboard");
    } else {
      // Login flow
      if (!storedUser) {
        setError("No account found. Please sign up first.");
        return;
      }
      if (
        formData.username === storedUser.username &&
        formData.password === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        setError("");
        alert("Login successful ✅");
        navigate("/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p>
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <span
            className="toggle"
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setFormData({ username: "", password: "" });
            }}
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;