import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import './Login.css';
function FarmerScene() {
    return (
        <svg
            className="farmer-scene"
            viewBox="0 0 400 440"
            xmlns="http://www.w3.org/2000/svg"
        >

            {/* Background hills */}
            <path
                d="M0 260 Q100 190 200 250 Q300 170 400 240 V440 H0Z"
                fill="#4d9b45"
            />

            {/* Field rows */}
            <path
                d="M0 330 Q100 280 200 330 Q300 280 400 330"
                fill="none"
                stroke="#9dcc65"
                strokeWidth="8"
                opacity="0.7"
            />

            <path
                d="M0 365 Q100 315 200 365 Q300 315 400 365"
                fill="none"
                stroke="#7fb84f"
                strokeWidth="7"
                opacity="0.7"
            />

            {/* Farmer body */}
            <path
                d="M145 280 Q200 245 255 280 L285 405 H115Z"
                fill="#f1f5e9"
            />

            {/* Shirt shadow */}
            <path
                d="M145 280 Q200 310 255 280 L270 405 H130Z"
                fill="#e3eadb"
            />

            {/* Neck */}
            <rect
                x="177"
                y="220"
                width="46"
                height="45"
                rx="18"
                fill="#9a5f38"
            />

            {/* Face */}
            <ellipse
                cx="200"
                cy="180"
                rx="58"
                ry="65"
                fill="#a9693f"
            />

            {/* Ear */}
            <ellipse
                cx="144"
                cy="185"
                rx="10"
                ry="16"
                fill="#915b37"
            />

            <ellipse
                cx="256"
                cy="185"
                rx="10"
                ry="16"
                fill="#915b37"
            />

            {/* Hair */}
            <path
                d="M145 160 Q150 105 200 105 Q250 105 255 160
                   Q230 135 200 140 Q170 135 145 160Z"
                fill="#3c281e"
            />

            {/* Farmer turban */}
            <path
                d="M137 145
                   Q145 85 200 82
                   Q255 85 263 145
                   Q240 130 200 132
                   Q160 130 137 145Z"
                fill="#f8f4dc"
            />

            <path
                d="M150 117 Q200 95 250 117"
                fill="none"
                stroke="#ddd5b9"
                strokeWidth="9"
            />

            <path
                d="M144 137 Q200 115 256 137"
                fill="none"
                stroke="#d4cbaa"
                strokeWidth="8"
            />

            {/* Eyes */}
            <ellipse
                cx="178"
                cy="178"
                rx="5"
                ry="6"
                fill="#211914"
            />

            <ellipse
                cx="222"
                cy="178"
                rx="5"
                ry="6"
                fill="#211914"
            />

            {/* Eyebrows */}
            <path
                d="M166 165 Q178 158 189 165"
                fill="none"
                stroke="#3d271d"
                strokeWidth="5"
                strokeLinecap="round"
            />

            <path
                d="M211 165 Q222 158 234 165"
                fill="none"
                stroke="#3d271d"
                strokeWidth="5"
                strokeLinecap="round"
            />

            {/* Nose */}
            <path
                d="M200 180 L193 202 L204 204"
                fill="none"
                stroke="#79482f"
                strokeWidth="4"
                strokeLinecap="round"
            />

            {/* Smile */}
            <path
                d="M180 215 Q200 230 220 215"
                fill="none"
                stroke="#5d3324"
                strokeWidth="5"
                strokeLinecap="round"
            />

            {/* Arm */}
            <path
                d="M145 285 Q105 315 130 355"
                fill="none"
                stroke="#a9693f"
                strokeWidth="24"
                strokeLinecap="round"
            />

            <path
                d="M255 285 Q295 315 275 350"
                fill="none"
                stroke="#a9693f"
                strokeWidth="24"
                strokeLinecap="round"
            />

            {/* Hoe */}
            <line
                x1="290"
                y1="220"
                x2="320"
                y2="410"
                stroke="#76502f"
                strokeWidth="9"
                strokeLinecap="round"
            />

            <path
                d="M280 225 Q315 205 340 220"
                fill="none"
                stroke="#555"
                strokeWidth="12"
                strokeLinecap="round"
            />

            {/* Plants */}
            <g stroke="#1c6b35" strokeWidth="5">
                <path d="M55 390 L55 330" />
                <path d="M55 350 Q35 330 25 342" />
                <path d="M55 365 Q75 340 88 350" />

                <path d="M350 400 L350 335" />
                <path d="M350 355 Q330 335 318 345" />
                <path d="M350 370 Q370 345 385 355" />
            </g>

            {/* Small crops */}
            <g fill="#7fbd4f">
                <ellipse cx="40" cy="340" rx="15" ry="7" />
                <ellipse cx="75" cy="350" rx="15" ry="7" />
                <ellipse cx="330" cy="344" rx="15" ry="7" />
                <ellipse cx="375" cy="355" rx="15" ry="7" />
            </g>

        </svg>
    );
}

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
    password,
    loginType
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

               window.location.href = '/admin';

            } else {

                if (loginType !== 'FARMER') {
                    setError(
                        'This account is a Farmer. Please select Farmer Login.'
                    );

                    localStorage.removeItem('user');
                    return;
                }
window.location.href = '/dashboard';
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
    <div className="krishi-auth-page">

        <div className="auth-panel login-panel">

            <div className="panel-overlay">

                {/* BRAND */}
                <div className="brand-section">
                    <div className="brand-logo">🌾</div>

                    <div>
                        <h1>Krishi-Dhan</h1>
                        <p>
                            Smart Financial Tracking<br />
                            for Farmers
                        </p>
                    </div>

                    <div className="brand-badge">
                        🌾 Grow Better,<br />
                        Track Smarter
                    </div>
                </div>


                {/* HEADING */}
                <div className="login-heading">

                    <h2>
                        Welcome Back <span>🌿</span>
                    </h2>

                    <p>
                        Login to your Krishi-Dhan account
                    </p>

                </div>


                {/* LOGIN CARD */}
                <div className="auth-card">

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        <div className="input-group">

                            <label>
                                <span className="input-icon">✉</span>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label>
                                <span className="input-icon">🔒</span>
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                required
                            />

                        </div>


                        <div className="type-title">
                            Login as
                        </div>

                        <div className="type-options">

                            <label
                                className={`type-option ${
                                    loginType === "FARMER"
                                        ? "active"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="loginType"
                                    value="FARMER"
                                    checked={
                                        loginType === "FARMER"
                                    }
                                    onChange={(e) =>
                                        setLoginType(
                                            e.target.value
                                        )
                                    }
                                />

                                👨‍🌾 Farmer

                            </label>


                            <label
                                className={`type-option ${
                                    loginType === "ADMIN"
                                        ? "active"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="loginType"
                                    value="ADMIN"
                                    checked={
                                        loginType === "ADMIN"
                                    }
                                    onChange={(e) =>
                                        setLoginType(
                                            e.target.value
                                        )
                                    }
                                />

                                👨‍💼 Admin

                            </label>

                        </div>


                        <button
                            type="submit"
                            className="green-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing In..."
                                : "➜  Sign In"}
                        </button>

                    </form>


                    <div className="switch-auth">

                        Don't have an account?

                        <Link to="/register">
                            Register here
                        </Link>

                    </div>

                </div>


                {/* FEATURES */}
                <div className="feature-row">

                    <div className="feature">
                        <div className="feature-icon">₹</div>
                        <strong>Track Expenses</strong>
                        <span>
                            Keep farm costs<br />
                            under control
                        </span>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">🌱</div>
                        <strong>Plan Better</strong>
                        <span>
                            Make smart<br />
                            farming decisions
                        </span>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">🚜</div>
                        <strong>Increase Yield</strong>
                        <span>
                            Get timely<br />
                            insights
                        </span>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">🛡️</div>
                        <strong>Stay Secure</strong>
                        <span>
                            Your data is<br />
                            safe with us
                        </span>
                    </div>

                </div>


                <div className="bottom-brand">
                    🌾 Krishi-Dhan – Empowering Farmers 🌾
                </div>

            </div>

        </div>

    </div>
);
}
export default Login;