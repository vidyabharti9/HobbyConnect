import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("authToken", data.token);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Oops, something went wrong! Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In is coming soon!");
  };

  return (
    <div className="login-page">
      <div className="content">
      <div className="text-container">
  <h1>Welcome to HobbyConnect!</h1>
  <p>
    🕺💃 Let's break the routine and add some fun to your day! Whether you're
    into dancing, painting, gaming, or something quirky — we've got a place
    for YOU! 🎨🎮
  </p>
  <p>
    Join the most vibrant community where hobbies meet passion! 🚀 Explore,
    share, and make unforgettable memories!
  </p>
</div>


      </div>

      <div className="login-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2917/2917998.png"
          alt="HobbyConnect Logo"
          className="login-logo"
        />
        <h2>Log in to join the fun</h2>
  
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="login-links">
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          <span> · </span>
          <a href="/signup" className="signup-link">
            Not a member yet? Sign up now!
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;