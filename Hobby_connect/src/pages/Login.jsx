import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
        localStorage.setItem("authToken", data.token); // Save the JWT token
        navigate("/"); // Redirect to home page
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log in to HobbyConnect</h2>
        <p>Connect with others and share your hobbies effortlessly.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
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
        <a href="#" className="forgot-password">Forgot password?</a>
        <a href="/signup" className="signup-link">Sign up for HobbyConnect</a>
      </div>
    </div>
  );
}

export default Login;
