import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';
import "../styles/signup.css";

const Signup = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { mobile, password });
            
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred during signup.');
        }
        setMobile('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="auth-container" id="signup-container">
            <h2 className="auth-title" id="signup-title">Create Account</h2>
            <form className="auth-form" id="signup-form" onSubmit={handleSubmit}>
                <div className="auth-field" id="signup-mobile-field">
                    <label htmlFor="signup-mobile">Mobile Number:</label>
                    <input 
                        type="tel" 
                        id="signup-mobile" 
                        className="auth-input" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        required 
                    />
                </div>
                <div className="auth-field" id="signup-password-field">
                    <label htmlFor="signup-password">Password:</label>
                    <input 
                        type="password" 
                        id="signup-password" 
                        className="auth-input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="auth-field" id="signup-confirm-password-field">
                    <label htmlFor="signup-confirm-password">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="signup-confirm-password" 
                        className="auth-input" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="auth-button" id="signup-button">Sign Up</button>
            </form>
            <p className="auth-switch" id="switch-to-login">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Signup;