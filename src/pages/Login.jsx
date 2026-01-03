import React, { useState } from 'react';
import { Eye, EyeOff, Smartphone, Lock, ArrowRight, Shield, Users, TrendingUp } from 'lucide-react';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            alert('Login successful!');
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="bg-emerald-600 p-3 rounded-xl">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                        <span className="text-emerald-600 font-bold text-lg">F</span>
                                    </div>
                                </div>
                                <span className="text-3xl font-bold text-gray-900">FarmEdge</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Welcome Back to the Future of Farming
                            </h2>
                            <p className="text-xl text-gray-600 mb-12">
                                Join thousands of farmers revolutionizing agriculture with smart technology
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Real-time Analytics</h3>
                                    <p className="text-gray-600">Monitor your crops, weather, and market prices in real-time</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-xl">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Community Support</h3>
                                    <p className="text-gray-600">Connect with fellow farmers and agricultural experts</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-xl">
                                    <Shield className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Secure & Reliable</h3>
                                    <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                                <p className="text-gray-600">Access your farming dashboard</p>
                            </div>

                            <div onSubmit={handleSubmit} className="space-y-6">
                                {/* Mobile Number Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input 
                                            type="tel" 
                                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                                            placeholder="+91 12345 67890"
                                            value={mobile} 
                                            onChange={(e) => setMobile(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input 
                                            type={showPassword ? "text" : "password"}
                                            className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                                            placeholder="Enter your password"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-600">Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Sign In Button */}
                                <button 
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-5 h-5 bg-blue-600 rounded"></div>
                                        <span className="font-medium text-gray-700">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-5 h-5 bg-green-600 rounded"></div>
                                        <span className="font-medium text-gray-700">Phone</span>
                                    </button>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="mt-8 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">
                                        Create Account
                                    </button>
                                </p>
                            </div>
                        </div>
                        
                        {/* Mobile Branding */}
                        <div className="lg:hidden text-center mt-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="bg-emerald-600 p-2 rounded-lg">
                                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                                        <span className="text-emerald-600 font-bold text-sm">F</span>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">FarmEdge</span>
                            </div>
                            <p className="text-gray-600">Smart Agriculture Platform</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;