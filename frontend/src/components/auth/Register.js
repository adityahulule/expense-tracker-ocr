import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import './Login.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerUser(formData);
      alert("Registration Successful!");
      navigate('/login');
    } catch (err) {
      setError(typeof err === 'string' ? err : "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-side">
        <h1>Join Krishi-Dhan</h1>
        <p>Start tracking your farm investments today.</p>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Create Account</h2>

          {error && <p style={{color:'red'}}>{error}</p>}

          <form onSubmit={handleRegister}>

            <div className="auth-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Register
            </button>

          </form>

          <div className="auth-footer">
            Already a member? <Link to="/login">Login here</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;