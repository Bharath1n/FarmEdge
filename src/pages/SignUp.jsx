import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/signup.css"; // Import the CSS file

const Signup = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Here you can send the data to your backend or store it
        console.log({ mobile, password });
        
        // Show success alert and redirect to login
        alert("Signup successful! Please log in.");
        navigate('/login'); // Redirect to login page

        // Reset the form
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
            <p className="auth-switch" id="switch-to-login">Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;