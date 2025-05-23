import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ImageUpload.css';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageDate, setImageDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Set default date to today when component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setImageDate(formattedDate);

    // Request user's location asynchronously
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude}, ${longitude}`);
          },
          (err) => {
            console.error("Error fetching location:", err);
            setError("Unable to fetch your location. Please enter it manually.");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    fetchLocation(); // Call the function to fetch location
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    setImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError('Please select an image');
      return;
    }

    if (!description.trim()) {
      setError('Please provide a description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('complaintDescription', description);
      formData.append('complaintLocation', location);
      formData.append('date', imageDate);

      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:8888/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if needed
        }
      });

      if (response.data.success) {
        setSuccess('Image uploaded successfully!');
        // Reset form
        setImage(null);
        setPreview(null);
        setDescription('');
        setLocation('');
        const today = new Date();
        setImageDate(today.toISOString().split('T')[0]);
      } else {
        setError('Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in and try again.');
      } else {
        setError('An error occurred while uploading the image');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Report Waste</h2>
      <p className="subtitle">Upload an image of waste for recycling assistance</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="upload-area">
          <input
            type="file"
            id="image-input"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          <label htmlFor="image-input" className="file-label">
            {preview ? 'Change Image' : 'Choose Image'}
          </label>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          {!preview && (
            <div className="placeholder">
              <i className="upload-icon">📷</i>
              <p>Click to upload an image of waste</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="complaintDescription"
            name="complaintDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the waste material (e.g., plastic bottles, food waste, electronics)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="complaintLocation"
            id="complaintLocation"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where was this waste found?"
          />
        </div>

        <div className="form-group date-container">
          <label htmlFor="imageDate">Date Image Was Taken:</label>
          <input
            type="date"
            id="imageDate"
            value={imageDate}
            onChange={(e) => setImageDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]} // Prevents future dates
            required
          />
          <div className="calendar-icon">📅</div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Report'}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;