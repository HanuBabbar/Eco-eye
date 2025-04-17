import React, { useState } from "react";
import "../styles/user_card.css";// Adjust the path as necessary

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User login attempt with:", formData);
        // Add login logic here
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
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="forgot-password">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Sign In <i className="fas fa-arrow-right"></i>
                    </button>

                    <div className="register-option">
                        <p>Don't have an account? <a href="/Signup">Sign up</a></p>
                    </div>
                </form>

                <div className="social-login">
                    <div className="divider">
                        <span>Or continue with</span>
                    </div>
                    <div className="social-buttons">
                        <button className="social-btn google">
                            <i className="fab fa-google"></i>
                        </button>
                        <button className="social-btn facebook">
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