import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignupForm.css';
import axios from 'axios';

const SignupForm = ({ onBackToDashboard }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Handle successful signup
            setIsSuccess(true);
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                agreeTerms: false
            });


            // New addition passing the data to the backend Server
            // Make POST request to your backend API
            const response = await axios.post('http://localhost:8888/Signup', // Replace with your actual endpoint
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other required headers (like authorization tokens)
                    }
                }
            );

            // Handle successful response from the server
            if (response.data.success) {
                setIsSuccess(true);
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    agreeTerms: false
                });
            } else {
                // Handle server-side validation errors
                setErrors({ form: response.data.message || 'Registration failed. Please try again.' });
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ form: 'An error occurred. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    
    

    return (
        <div className="signup-container">
            <div className="signup-form-wrapper">
               
                <h2>Create Your Account</h2>
                <p className="form-subtitle">Join Eco-eye and start your sustainable journey today</p>

                {isSuccess && (
                    <div className="success-message">
                        <i className="fas fa-check-circle"></i>
                        <p>Your account has been created successfully! Please check your email for verification.</p>
                    </div>
                )}

                {errors.form && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>{errors.form}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={isSuccess ? 'hidden' : ''}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={errors.fullName ? 'error' : ''}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Create a password"
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                        />
                        <label htmlFor="agreeTerms">
                            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                        </label>
                        {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
                    </div>

                    <button type="submit" className="signup-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="form-footer">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </form>

                {isSuccess && (
                    <div className="next-steps">
                        <button className="cta-button primary" onClick={() => window.location.href = "/dashboard"}>
                            Go to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupForm;
