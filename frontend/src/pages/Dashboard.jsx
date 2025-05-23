import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";

const Dashboard = ({ onSignupClick }) => {
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check if the user is logged in
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

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
                                {!isLoggedIn && ( // Conditionally render buttons if the user is not logged in
                                    <>
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
                                    </>
                                )}
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

                    {/* Service Section */}
                    <section className="service-section">
                        <h2>Our Solution</h2>
                        <p className="service-tagline">Simplifying environmental action with our three-step approach</p>

                        <div className="service-steps">
                            <div className="service-step">
                                <div className="step-icon">
                                    <i className="fas fa-eye"></i>
                                </div>
                                <h3>See It</h3>
                                <p>Identify environmental issues in your surroundings. Our platform helps you recognize potential areas for improvement and sustainability challenges.</p>
                            </div>

                            <div className="service-step">
                                <div className="step-icon">
                                    <i className="fas fa-camera"></i>
                                </div>
                                <h3>Snap It</h3>
                                <p>Upload images of environmental concerns through our easy-to-use interface. Our AI technology analyzes the image to identify the issue.</p>
                            </div>

                            <div className="service-step">
                                <div className="step-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3>Solve It</h3>
                                <p>Receive personalized recommendations and actionable steps to address the environmental issues. Track your progress and positive impact over time.</p>
                            </div>
                        </div>

                        <button className="service-cta" onClick={handleGetStartedClick}>
                            Register Complaint
                        </button>
                    </section>

                    {/* About Us Section */}
                    <section className="about-section">
                        <h2>About Us</h2>
                        <div className="about-content">
                            <div className="about-text">
                                <h3 className="about-subtitle">Our Mission</h3>
                                <p>Eco-eye is a pioneering platform dedicated to environmental consciousness and sustainable living. Our mission is to empower individuals and businesses to understand and reduce their environmental impact.</p>
                                <p>By connecting people with actionable insights and authorities, we create a pathway for immediate environmental problem-solving.</p>
                                <div className="about-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">500+</span>
                                        <span className="stat-label">Issues Resolved</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">30%</span>
                                        <span className="stat-label">Faster Response Time</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">12K+</span>
                                        <span className="stat-label">Active Users</span>
                                    </div>
                                </div>
                            </div>
                            <div className="about-values">
                                <h3>Our Impact</h3>
                                <ul className="impact-list">
                                    <li>
                                        <span className="impact-icon"><i className="fas fa-heart"></i></span>
                                        <div>
                                            <strong>Enhanced Well-being</strong>
                                            <p>Cleaner environments directly improve daily quality of life</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="impact-icon"><i className="fas fa-chart-line"></i></span>
                                        <div>
                                            <strong>Cost Efficiency</strong>
                                            <p>Optimized processes reduce costs by 15-20%</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="impact-icon"><i className="fas fa-laptop-code"></i></span>
                                        <div>
                                            <strong>Technology-Driven</strong>
                                            <p>AI-powered solutions for modern environmental challenges</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span className="impact-icon"><i className="fas fa-users"></i></span>
                                        <div>
                                            <strong>Community-Centered</strong>
                                            <p>Empowering local action for global impact</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Contact Us Section */}
                    <section className="contact-section">
                        <h2>Contact Us</h2>
                        <div className="contact-content">
                            <div className="contact-info">
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <p>info@ecoeye.com</p>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <p>123 Green Street, Eco City, EC 12345</p>
                                </div>
                            </div>
                            <div className="contact-form">
                                <input type="text" placeholder="Name" />
                                <input type="email" placeholder="Email" />
                                <textarea placeholder="Message"></textarea>
                                <button className="contact-submit">Send Message</button>
                            </div>
                        </div>
                    </section>

                    {/* Footer Section */}
                    <footer className="site-footer">
                        <div className="footer-content">
                            <div className="footer-logo-section">
                                <h3 className="footer-logo">Eco-eye</h3>
                                <p>Empowering sustainable choices through technology and community action.</p>
                                <div className="social-links">
                                    <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>

                            <div className="footer-links">
                                <div className="footer-links-column">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>

                                <div className="footer-links-column">
                                    <h4>Resources</h4>
                                    <ul>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">FAQ</a></li>
                                        <li><a href="#">Support</a></li>
                                        <li><a href="#">Community</a></li>
                                    </ul>
                                </div>

                                <div className="footer-links-column">
                                    <h4>Legal</h4>
                                    <ul>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Terms of Service</a></li>
                                        <li><a href="#">Cookie Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="footer-bottom">
                            <p>&copy; {new Date().getFullYear()} Eco-eye. All rights reserved.</p>
                            <p>Designed with <span className="heart">♥</span> for a greener planet</p>
                        </div>
                    </footer>
                </>
            )}
        </div>
    );
};

export default Dashboard;