import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <i className="fas fa-leaf"></i>
          <span>Eco-eye</span>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link">
            <span>Home</span>
          </a>
          <a href="#about" className="nav-link">
            <span>About</span>
          </a>
          <a href="#contact" className="nav-link">
            <span>Contact Us</span>
          </a>
          <a href="#services" className="nav-link">
            <span>Services</span>
          </a>
          
          {isLoggedIn ? (
          <button onClick={() => navigate('/user')} className="nav-button">
             Dashboard
           </button>
        ) : (
          <Link to="/Signup" className="nav-button">
            Sign Up
          </Link>
          )}
        </div>

        {/* <button onClick={ () =>
          navigate("/signup")
        }>
          Hii Send This
        </button> */}

        <div className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;