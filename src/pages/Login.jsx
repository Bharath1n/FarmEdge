import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="flex items-center justify-center min-h-screen  bg-cover bg-gradient-to-t from-neutral-100 to-green-300">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Mobile Number:</label>
                        <input 
                            type="tel" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={mobile} 
                            onChange={(e) => setMobile(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password:</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link className="text-green-500 hover:underline" to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" to produce jwt secret key

export default Login;
