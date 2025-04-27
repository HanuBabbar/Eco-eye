import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css';

const Edit = () => {
    const navigate = useNavigate();

    // User profile state
    const [userData, setUserData] = useState({
        name: '',
        email: '',

        password: '',
        confirmPassword: '',
        profileImage: null
    });

    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Load user data on component mount
    useEffect(() => {
        // Mock data - replace with API call
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',

            profileImage: 'https://via.placeholder.com/150'
        };

        setUserData(userData);
        setPreview(userData.profileImage);
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle profile image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserData(prev => ({
                ...prev,
                profileImage: file
            }));

            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Submit form handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (userData.password !== userData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage('Profile updated successfully!');

            // In real app, you would make an API call like:
            // const response = await fetch('/api/user/update', {
            //   method: 'PUT',
            //   headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify(userData)
            // });

            setTimeout(() => {
                navigate('/user');
            }, 2000);
        } catch (error) {
            setMessage('Error updating profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-profile">
            <div className="edit-container">
                <h1>Edit Profile</h1>

                {message && <div className="message">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="profile-image-section">
                        <div className="image-preview">
                            <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" alt="Profile" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div> */}







                    <div className="form-divider"></div>

                    <h2>Change Password</h2>
                    <p className="password-note">Leave blank if you don't want to change your password</p>

                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/user')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
