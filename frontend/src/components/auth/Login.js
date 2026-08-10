// src/components/auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService'; 
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ONLY ONE handleLogin function
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');

    try {
      const response = await loginUser({ email, password });
      
      if (response) {
        console.log("Login Success:", response);
        
        // 1. Store the user data
        localStorage.setItem('user', JSON.stringify(response));
        
        // 2. Redirect to dashboard
        navigate('/dashboard'); 
        
        // 3. Optional: refresh for navbar state
        window.location.reload();
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-side">
        <h1>Krishi-Dhan</h1>
        <p>Harvesting prosperity through smart financial tracking.</p>
      </div>
      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          {/* Error message will now actually show up in the UI */}
          {error && <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div className="auth-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@farm.com" 
                required 
              />
            </div>
            <div className="auth-input-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" className="auth-btn">Sign In</button>
          </form>
          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;