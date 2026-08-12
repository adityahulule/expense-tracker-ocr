import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import './Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('FARMER');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setError('');
        setLoading(true);

        try {

            const response = await loginUser({
                email,
                password
            });

            console.log('Login Response:', response);

            if (!response) {
                setError('Invalid login response from server.');
                return;
            }

            // Store user
            localStorage.setItem(
                'user',
                JSON.stringify(response)
            );

            /*
             * IMPORTANT:
             * Backend role decides actual access.
             */

            if (response.role === 'ADMIN') {

                if (loginType !== 'ADMIN') {
                    setError(
                        'This account is an Admin. Please select Admin Login.'
                    );

                    localStorage.removeItem('user');
                    return;
                }

                navigate('/admin');

            } else {

                if (loginType !== 'FARMER') {
                    setError(
                        'This account is a Farmer. Please select Farmer Login.'
                    );

                    localStorage.removeItem('user');
                    return;
                }

                navigate('/dashboard');
            }

        } catch (err) {

            console.error('Login failed:', err);

            setError(
                err.response?.data?.message ||
                err.message ||
                'Invalid email or password'
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="auth-container">

            {/* LEFT SIDE */}

            <div className="auth-image-side">

                <h1>🌾 Krishi-Dhan</h1>

                <p>
                    Harvesting prosperity through
                    smart financial tracking.
                </p>

            </div>


            {/* RIGHT SIDE */}

            <div className="auth-form-side">

                <div className="auth-card">

                    <h2>Welcome Back</h2>

                    <p className="login-subtitle">
                        Login to your Krishi-Dhan account
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


                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="auth-input-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
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
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                required
                            />

                        </div>


                        {/* LOGIN TYPE */}

                        <div className="login-type-section">

                            <label className="login-type-title">
                                Login as
                            </label>

                            <div className="login-type-options">

                                <label
                                    className={
                                        `login-type-option ${
                                            loginType === 'FARMER'
                                                ? 'selected'
                                                : ''
                                        }`
                                    }
                                >

                                    <input
                                        type="radio"
                                        name="loginType"
                                        value="FARMER"
                                        checked={
                                            loginType === 'FARMER'
                                        }
                                        onChange={(e) =>
                                            setLoginType(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        👨‍🌾 Farmer
                                    </span>

                                </label>


                                <label
                                    className={
                                        `login-type-option ${
                                            loginType === 'ADMIN'
                                                ? 'selected'
                                                : ''
                                        }`
                                    }
                                >

                                    <input
                                        type="radio"
                                        name="loginType"
                                        value="ADMIN"
                                        checked={
                                            loginType === 'ADMIN'
                                        }
                                        onChange={(e) =>
                                            setLoginType(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        👨‍💼 Admin
                                    </span>

                                </label>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={loading}
                        >
                            {loading
                                ? 'Signing In...'
                                : '🔐 Sign In'
                            }
                        </button>

                    </form>


                    {/* REGISTER */}

                    <div className="auth-footer">

                        Don't have an account?

                        {' '}

                        <Link to="/register">
                            Register here
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;