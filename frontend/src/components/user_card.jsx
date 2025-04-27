import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/user_card.css";

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        // Clear error when user makes changes
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            console.log("User login attempt with:", formData);
            
            const response = await axios.post('http://localhost:8888/login',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // withCredentials: true // Necessary if your API uses cookies for auth
                }
            );
            
            // Check response status and handle accordingly
            if (response.status === 200 && response.data) {
                console.log('Login successful:', response.data);
                
                // Store user data or token in localStorage/sessionStorage if needed
                // if (formData.rememberMe) {
                //     // localStorage.setItem('user', JSON.stringify(response.data.user));
                //     localStorage.setItem('token', response.data.token);
                // } else {
                //     sessionStorage.setItem('user', JSON.stringify(response.data.user));
                //     sessionStorage.setItem('token', response.data.token);
                // }
                localStorage.setItem('token', response.data.token);
                console.log('Token stored:', response);
                // Redirect to dashboard or home page
                navigate('/dashboard');
            } else {
                // Handle unexpected response format
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            
            // Handle specific error responses
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.response.status === 401) {
                    setError('Invalid email or password');
                } else if (err.response.status === 404) {
                    setError('User not found');
                } else {
                    setError(err.response.data?.message || 'An error occurred during login');
                }
            } else if (err.request) {
                // The request was made but no response was received
                setError('Server is not responding. Please try again later.');
            } else {
                // Something happened in setting up the request
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-login-container">
            <div className="user-login-card">
                <div className="user-login-header">
                    <div className="logo-circle">
                        <i className="fas fa-seedling"></i>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your Eco-eye account</p>
                </div>

                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="login-options">
                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="forgot-password">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span>Signing In <i className="fas fa-spinner fa-spin"></i></span>
                        ) : (
                            <span>Sign In <i className="fas fa-arrow-right"></i></span>
                        )}
                    </button>

                    <div className="register-option">
                        <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
                    </div>
                </form>

                <div className="social-login">
                    <div className="divider">
                        <span>Or continue with</span>
                    </div>
                    <div className="social-buttons">
                        <button className="social-btn google" disabled={isLoading}>
                            <i className="fab fa-google"></i>
                        </button>
                        <button className="social-btn facebook" disabled={isLoading}>
                            <i className="fab fa-facebook-f"></i>
                        </button>
                    </div>
                </div>

                <div className="eco-decoration">
                    <div className="leaf leaf-1"></div>
                    <div className="leaf leaf-2"></div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;