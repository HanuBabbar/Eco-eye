const {uploadOnCloudinary} = require('../utils/fileUpload');
const ComplaintModel = require('../Models/ComplaintModel');

exports.uploadImage =async (req, res) => {
    const {complaintLocation, complaintDate, complaintDescription, complaintStatus, complaintImage} = req.body; // Access additional fields
    const file = req.file; // Access the uploaded file
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // Validate the required fields
    if (!complaintLocation || !complaintDescription || !complaintImage || !complaintStatus || !complaintDate) {
        console.log("Complaint Missing Fields");
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    // Push the data to databse
    await ComplaintModel.create({
        complaintLocation,
        complaintDate,
        complaintDescription,
        complaintStatus,
        complaintImage: file.path, // Store the file path in the database
    }).then(() => {
        console.log("Complaint Created");
    }).catch((err) => {
        console.log(err);
    });


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
