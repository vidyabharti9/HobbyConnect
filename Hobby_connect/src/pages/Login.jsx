import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login response:", data); // Debug log for response data
        const { message, token } = data; // Expecting `message` and `token` in the response
        
        if (token) {
          // Save token in localStorage (and other data if needed)
          localStorage.setItem('token', token); // Store token in localStorage
          console.log("Token saved:", token);

          // You can also store the message or other response data in context if needed
          login(message, token); // Assuming message is some kind of user-related data

          // Navigate to dashboard after successful login
          navigate('/dashboard');
        } else {
          setError('Invalid response from server.');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
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
        <a href="#" className="forgot-password">
          Forgot password?
        </a>
        <a href="/signup" className="signup-link">
          Sign up for HobbyConnect
        </a>
      </div>
    </div>
  );
}

export default Login;
