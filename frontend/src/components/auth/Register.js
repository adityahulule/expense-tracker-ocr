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
        setLoading(true);

        try {

            // Public registration always creates a FARMER/USER
            const registrationData = {
                ...formData,
                role: 'USER'
            };

            await registerUser(registrationData);

            alert(
                'Registration Successful! You can now login as a Farmer.'
            );

            navigate('/login');

        } catch (err) {

            console.error('Registration error:', err);

            setError(
                typeof err === 'string'
                    ? err
                    : err?.response?.data?.message ||
                      'Registration Failed'
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="auth-container">

            {/* LEFT SIDE */}

            <div className="auth-image-side">

                <h1>🌾 Join Krishi-Dhan</h1>

                <p>
                    Start tracking your farm
                    investments today.
                </p>

            </div>


            {/* RIGHT SIDE */}

            <div className="auth-form-side">

                <div className="auth-card">

                    <h2>Create Farmer Account</h2>

                    <p className="login-subtitle">
                        Register as a farmer to manage
                        your farm expenses.
                    </p>


                    {/* ERROR */}

                    {error && (

                        <p
                            style={{
                                color: '#dc2626',
                                background: '#fef2f2',
                                padding: '10px',
                                borderRadius: '6px',
                                marginBottom: '15px',
                                fontSize: '14px'
                            }}
                        >
                            {error}
                        </p>

                    )}


                    <form onSubmit={handleRegister}>

                        {/* FULL NAME */}

                        <div className="auth-input-group">

                            <label>
                                Full Name
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

                        <div className="auth-input-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@farm.com"
                                required
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="auth-input-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                minLength={6}
                            />

                        </div>


                        {/* ACCOUNT TYPE */}

                        <div className="login-type-section">

                            <label className="login-type-title">
                                Account Type
                            </label>

                            <div
                                className="login-type-option selected"
                            >
                                <span>
                                    👨‍🌾 Farmer
                                </span>

                                <small>
                                    Default account
                                </small>
                            </div>

                        </div>


                        {/* REGISTER BUTTON */}

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={loading}
                        >

                            {loading
                                ? 'Creating Account...'
                                : '🌱 Create Farmer Account'
                            }

                        </button>

                    </form>


                    <div className="auth-footer">

                        Already a member?

                        {' '}

                        <Link to="/login">
                            Login here
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;