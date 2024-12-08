import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/signup.css"; // Import the CSS file

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can validate the login credentials
        console.log({ mobile, password });

        // Show success alert and redirect to home
        alert("Login successful!");
        navigate('/home'); // Redirect to home screen

        // Reset the form
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
            <p className="auth-switch" id="switch-to-signup">Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
};

export default Login;