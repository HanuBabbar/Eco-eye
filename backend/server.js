const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 


// Main Route for testing server
app.get("/", (req, res) => {
    res.json({
        message: "Hello from server"
    });
});

// Pos
app.post('/Signup', (req, res) => {
    const { fullName, email, password } = req.body; // Ensure the keys match what you're sending
    console.log("User  created:", { fullName, email, password }); // Log the user data
    res.json({
        success: true,
        message: "User  registered successfully",
    })
});
// Mounted routes from the routes folder
const routes = require('./routes/User'); // Adjust the path as necessary
app.use(routes); // Use the routes defined in User.js



// Multer file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});
// Create Multer instance
const upload = multer({ storage: storage });
// route for image upload
app.post('/upload', upload.single('image'), (req, res) => {
    const { description, location } = req.body; // Access additional fields
    const file = req.file; // Access the uploaded file
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // Log the received data
    console.log('File:', file);
    console.log('Description:', description);
    console.log('Location:', location);
    // Respond with success
    res.json({ success: true, message: 'Image uploaded successfully!', file: file });
});
console.log(__dirname);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Db Connection
const connectDb = require('./config/atlasConn'); // Adjust the path as necessary
connectDb();


// Start the server
app.listen(8888, () => {
    console.log("Server is running on port 8888");
});