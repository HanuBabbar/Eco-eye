const {uploadOnCloudinary} = require('../utils/fileUpload');

exports.uploadImage =async (req, res) => {
    const { description, location } = req.body; // Access additional fields
    const file = req.file; // Access the uploaded file
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // Upload the file to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
    if (!cloudinaryResponse) {
        return res.status(500).json({ success: false, message: 'Failed to upload image to Cloudinary.' });
    }
    
    // Log the received data
    console.log('File:', file);
    console.log('Description:', description);
    console.log('Location:', location);
    // Respond with success
    res.json({ success: true, message: 'Image uploaded successfully!', file: file });
};
