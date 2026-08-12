import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import './Register.css';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setError('');

        if (formData.password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must contain at least 6 characters.');
            return;
        }

        setLoading(true);

        try {

            const registrationData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: 'USER'
            };

            console.log('Registration Data:', registrationData);

            await registerUser(registrationData);

            alert(
                'Registration Successful! You can now login as a Farmer.'
            );

            navigate('/login');

        } catch (err) {

            console.error('Registration error:', err);

            if (typeof err === 'string') {
                setError(err);
            } else if (err?.response?.data) {

                if (typeof err.response.data === 'string') {
                    setError(err.response.data);
                } else {
                    setError(
                        err.response.data.message ||
                        'Registration Failed'
                    );
                }

            } else {
                setError(
                    err?.message ||
                    'Registration Failed'
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="register-page">

            {/* =========================================
                BRAND
            ========================================= */}

            <div className="register-brand">

                <div className="register-brand-left">

                    <div className="register-logo">
                        🌾
                    </div>

                    <div>

                        <h1>
                            Krishi-Dhan
                        </h1>

                        <p>
                            Smart Financial Tracking
                            <br />
                            for Farmers
                        </p>

                    </div>

                </div>

                <div className="register-badge">

                    🌾 <strong>Grow Better,</strong>
                    <br />

                    <span>
                        Track Smarter
                    </span>

                </div>

            </div>


            {/* =========================================
                HEADING
            ========================================= */}

            <div className="register-heading">

                <h2>
                    Create Your Account 🌿
                </h2>

                <p>
                    Join Krishi-Dhan and manage your
                    <br />
                    farm finances better
                </p>

            </div>


            {/* =========================================
                FORM CARD
            ========================================= */}

            <div className="register-card">

                {error && (

                    <div className="register-error">
                        ❌ {error}
                    </div>

                )}

                <form onSubmit={handleRegister}>

                    {/* FULL NAME */}

                    <div className="register-input-group">

                        <label>
                            👤 Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="register-input-group">

                        <label>
                            ✉️ Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="register-input-group">

                        <label>
                            🔒 Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            minLength={6}
                            required
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="register-input-group">

                        <label>
                            🔒 Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Confirm your password"
                            minLength={6}
                            required
                        />

                    </div>


                    {/* ACCOUNT TYPE */}

                    <div className="register-type-section">

                        <label className="register-type-title">
                            Register as
                        </label>

                        <div className="register-type-option">

                            <span>
                                👨‍🌾 Farmer
                            </span>

                            <small>
                                Default account
                            </small>

                        </div>

                    </div>


                    {/* TERMS */}

                    <label className="terms-row">

                        <input
                            type="checkbox"
                            required
                        />

                        <span>
                            I agree to the{' '}
                            <strong>
                                Terms &amp; Conditions
                            </strong>
                        </span>

                    </label>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >

                        {loading
                            ? 'Creating Account...'
                            : '👤 Create Account'
                        }

                    </button>

                </form>


                {/* LOGIN */}

                <div className="register-footer">

                    Already have an account?

                    {' '}

                    <Link to="/login">
                        Login here
                    </Link>

                </div>

            </div>


            {/* =========================================
                FEATURES
            ========================================= */}

            <div className="register-features">

                <div className="register-feature">

                    <span>📋</span>

                    <strong>
                        Simple &amp; Easy
                        <br />
                        Tracking
                    </strong>

                </div>

                <div className="register-feature">

                    <span>🏛️</span>

                    <strong>
                        Govt. Scheme
                        <br />
                        Updates
                    </strong>

                </div>

                <div className="register-feature">

                    <span>🌱</span>

                    <strong>
                        Better Farming
                        <br />
                        Decisions
                    </strong>

                </div>

            </div>


            {/* FOOTER */}

            <div className="register-bottom-text">

                🌾 Krishi-Dhan – Empowering Farmers 🌾

            </div>

        </div>
    );
}

export default Register;