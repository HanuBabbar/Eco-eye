const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios'); // Make sure to install axios
const { uploadOnCloudinary } = require('../utils/fileUpload');
const ComplaintModel = require('../Models/ComplaintModel');

exports.uploadImage = async (req, res) => {
    const { complaintLocation, complaintDate, complaintDescription } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    try {
        console.log("Complaint Location:", complaintLocation);

        // Prepare FormData for FastAPI
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));

        // Send the image to FastAPI using axios
        const aiResponse = await axios.post('http://localhost:8000/predict', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        const aiResult = aiResponse.data;
        console.log("AI Result:",aiResult);
        const result= (aiResult.confidence*100).toFixed(2) +"% "+ (aiResult.prediction ? "Non" :"Bio"); // Assuming the AI result is in the 'result' field
        console.log("AI Result:", result);
        // Upload image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(file.path);

        if (!cloudinaryResponse) {
            return res.status(500).json({ success: false, message: 'Failed to upload image to Cloudinary.' });
        }

        // Save complaint to MongoDB
        await ComplaintModel.create({
            complaintLocation,
            complaintDate,
            complaintDescription,
            complaintImage: cloudinaryResponse.url,
            aiOpinion: result
        });

        console.log("Complaint created successfully");

        // After everything is done, delete the local uploaded file
        res.json({
            success: true,
            message: 'Image uploaded and processed successfully!',
            cloudinaryUrl: cloudinaryResponse.url,
            aiOpinion: aiResult
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
};
