const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const { uploadOnCloudinary } = require('../utils/fileUpload');
const ComplaintModel = require('../Models/ComplaintModel');
const UserModel = require('../Models/UserModel'); // Adjust the path as necessary

exports.updateImage = async (req, res) => {
    try {
        const imgId = req.id;
        const complaint = await ComplaintModel.findById(imgId);

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found.' });
        }

        // Update only the complaintStatus
        complaint.complaintStatus = !(complaint.complaintStatus); // or false based on your logic or request input
        await complaint.save();

        return res.json({ success: true, message: 'Complaint status updated successfully.', complaint });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
};


exports.uploadImage = async (req, res) => {
    const { complaintLocation, complaintDate, complaintDescription } = req.body;
    const file = req.file;
    const user = req.user; // Assuming user ID is available in req.user
    if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized user.' });
    }

    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    let aiResultText = "AI server not active"; // Default if AI not available

    try {
        console.log("Complaint Location:", complaintLocation);

        // Prepare FormData for FastAPI
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));

        try {
            // Send the image to FastAPI using axios
            const aiResponse = await axios.post('http://localhost:8000/predict', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
                timeout: 3000, // Wait max 2 seconds, avoid stuck requests
            });

            const aiData = aiResponse.data;
            console.log("AI Result:", aiData);

            aiResultText = (aiData.confidence * 100).toFixed(2) + "% " + (aiData.prediction ? "Non-Biodegradable" : "Biodegradable");
        } catch (err) {
            console.warn("AI server not reachable. Skipping AI prediction.");
            // If FastAPI not active, we continue without crashing
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(file.path);

        if (!cloudinaryResponse) {
            return res.status(501).json({ success: false, message: 'Failed to upload image to Cloudinary.' });
        }

        // console.log(user.id, "User ID");
        const userData = await UserModel.findOne({_id : user.id});
        // console.log(userData);
        // Save complaint to MongoDB
        await ComplaintModel.create({
            complaintLocation,
            complaintDate,
            complaintDescription,
            complaintImage: cloudinaryResponse.url,
            aiOpinion: aiResultText,
            email: userData.email,
            complaintUser: user.id // Assuming user ID is available in req.user
        });
        console.log("Complaint created successfully");

        res.json({
            success: true,
            message: 'Image uploaded successfully!',
            aiOpinion: aiResultText,
            cloudinaryUrl: cloudinaryResponse.url
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
};
