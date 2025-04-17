import React, { useState } from "react";
import "../styles/admin_card.css";

const AdminCard = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", formData);
  };

  return (
    <div className="admin-card-container">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="logo">
            <i className="fas fa-leaf"></i>
          </div>
          <h2>Admin Portal</h2>
          <p>Please enter your credentials to continue</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username" 
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
          
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-button">
            Log In <i className="fas fa-arrow-right"></i>
          </button>
        </form>
        
        <div className="admin-card-footer">
          <p>Need help? <a href="#">Contact support</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;