import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";

const Dashboard = ({ onSignupClick }) => {
    const [showImageUpload, setShowImageUpload] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleGetStartedClick = () => {
        setShowImageUpload(true);
    };

    return (
        <div className="dashboard-container">
            <Navbar onSignupClick={onSignupClick} />

            {showImageUpload ? (
                <div className="image-upload-wrapper">
                    <button className="back-button" onClick={() => setShowImageUpload(false)}>
                        Back
                    </button>
                    <ImageUpload />
                </div>
            ) : (
                <>
                    <section className="hero-section">
                        <div className="parallax-bg"></div>

                        {/* Floating Leaves Animation */}
                        <div className="leaf leaf-1"></div>
                        <div className="leaf leaf-2"></div>
                        <div className="leaf leaf-3"></div>
                        <div className="leaf leaf-4"></div>
                        <div className="leaf leaf-5"></div>

                        <div className="hero-content">
                            <h1 className="hero-title">Welcome to <span>Eco-eye</span></h1>
                            <p className="hero-text">
                                Track, analyze, and improve your environmental impact with our comprehensive sustainability dashboard.
                            </p>
                            <div className="hero-buttons">
                                <button 
                                    className="cta-button primary"
                                    onClick={() => navigate('/login')} // Redirect to login
                                >
                                    Log in
                                </button>
                                <button
                                    className="cta-button secondary"
                                    onClick={() => navigate('/Signup')} // Redirect to signup
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        <div className="scroll-indicator">
                            <div className="mouse">
                                <div className="wheel"></div>
                            </div>
                            <div className="arrows">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="features-section">
                        <h2>Our Features</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <i className="fas fa-chart-line"></i>
                                <h3>Environmental Tracking</h3>
                                <p>Monitor your carbon footprint, energy usage, and waste production with real-time data analytics.</p>
                            </div>
                            <div className="feature-card">
                                <i className="fas fa-leaf"></i>
                                <h3>Sustainability Goals</h3>
                                <p>Set personalized sustainability goals and track your progress with our intuitive dashboard.</p>
                            </div>
                            <div className="feature-card">
                                <i className="fas fa-lightbulb"></i>
                                <h3>Eco-friendly Tips</h3>
                                <p>Receive customized recommendations to reduce your environmental impact and live more sustainably.</p>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default Dashboard;