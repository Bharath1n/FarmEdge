import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';
import "../styles/signup.css";

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { mobile, password });
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred during login.');
        }

        setMobile('');
        setPassword('');
    };

    return (
        <div className="auth-container" id="login-container">
            <h2 className="auth-title" id="login-title">Login</h2>
            <form className="auth-form" id="login-form" onSubmit={handleSubmit}>
                <div className="auth-field" id="login-mobile-field">
                    <label htmlFor="login-mobile">Mobile Number:</label>
                    <input 
                        type="tel" 
                        id="login-mobile" 
                        className="auth-input" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        required 
                    />
                </div>
                <div className="auth-field" id="login-password-field">
                    <label htmlFor="login-password">Password:</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        className="auth-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="auth-button" id="login-button">Login</button>
            </form>
            <p className="auth-switch" id="switch-to-signup">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
};
// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" to produce jwt secret key

export default Login;