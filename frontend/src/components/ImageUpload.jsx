import { useState } from 'react';
import axios from 'axios';
import '../styles/ImageUpload.css'; // You'll need to create this CSS file

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      formData.append('description', description);
      formData.append('location', location);
      
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:6000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setSuccess('Image uploaded successfully!');
        // Reset form
        setImage(null);
        setPreview(null);
        setDescription('');
        setLocation('');
      } else {
        setError('Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Error uploading image. Please try again.');
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
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the waste material (e.g., plastic bottles, food waste, electronics)"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location (optional):</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where was this waste found?"
          />
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