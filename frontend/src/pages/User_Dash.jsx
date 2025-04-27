import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/UserDash.css'; // Ensure this CSS file exists

const UserDashboard = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        joinDate: 'January 2023',
        avatar: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png' // Placeholder avatar
    });

    const [requests, setRequests] = useState([
        { id: 1, title: 'Garbage Disposal Issue', status: 'Pending', date: '2023-06-15' },
        { id: 2, title: 'Water Contamination Report', status: 'In Progress', date: '2023-06-10' },
        { id: 3, title: 'Illegal Dumping', status: 'Resolved', date: '2023-06-05' }
    ]);

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    // Fetch user data from localStorage or API
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('userData');
        localStorage.removeItem('token'); // Remove token if used for authentication

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className="user-dashboard">
            {/* Sidebar with user information */}
            <aside className="dashboard-sidebar">
                <div className="user-profile">
                    <div className="avatar-container">
                        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                    </div>
                    <h2>{user.name}</h2>
                    <p className="user-email">{user.email}</p>
                    <div className="user-stats">
                        <div className="stat">
                            <span className="stat-number">{requests.length}</span>
                            <span className="stat-label">Total Requests</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">
                                {requests.filter(req => req.status === 'Resolved').length}
                            </span>
                            <span className="stat-label">Resolved</span>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <Link to="/dashboard" className="sidebar-link active">Dashboard</Link>
                        <Link to="/profile" className="sidebar-link">Edit Profile</Link>
                        <Link to="/settings" className="sidebar-link">Settings</Link>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="dashboard-content">
                <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
                <div className="dashboard-cards">
                    {/* Register New Complaint Card */}
                    <div className="dashboard-card new-complaint">
                        <div className="card-icon">
                            <i className="fas fa-plus-circle"></i>
                        </div>
                        <h2>Register New Complaint</h2>
                        <p>Submit a new environmental issue that needs attention</p>
                        <Link to="/new-complaint" className="card-button">
                            Create Complaint
                        </Link>
                    </div>

                    {/* Your Requests Card */}
                    <div className="dashboard-card your-requests">
                        <h2>Your Recent Requests</h2>
                        <div className="requests-list">
                            {requests.length > 0 ? (
                                requests.slice(0, 3).map(request => (
                                    <div key={request.id} className="request-item">
                                        <div className="request-content">
                                            <h3>{request.title}</h3>
                                            <p className="request-date">Submitted on {request.date}</p>
                                        </div>
                                        <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                                            {request.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="no-requests">No requests submitted yet</p>
                            )}
                        </div>
                        <Link to="/all-requests" className="view-all-link">
                            View All Requests
                        </Link>
                    </div>
                </div>

                {/* All Requests Section */}
                <div className="all-requests-section">
                    <div className="section-header">
                        <h2>All Your Requests</h2>
                        <div className="filter-options">
                            <select defaultValue="all" className="status-filter">
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                    </div>
                    <div className="requests-table-container">
                        <table className="requests-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(request => (
                                    <tr key={request.id}>
                                        <td>#{request.id}</td>
                                        <td>{request.title}</td>
                                        <td>{request.date}</td>
                                        <td>
                                            <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to={`/request/${request.id}`} className="action-link">View Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;