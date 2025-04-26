const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(cors({origin:"*"}));
app.use(express.json()); 


// Main Route for testing server
app.get("/", (req, res) => {
    res.json({
        message: "Hello from server"
    });
});

// Mounted routes from the routes folder
const routes = require('./src/routes/UserRoutes'); // Adjust the path as necessary
const complaintRoutes = require('./src/routes/Complaint'); // Adjust the path as necessary
const adminRoutes = require('./src/routes/AdminRoutes');
app.use(routes); // Use the routes defined in User.js
app.use(complaintRoutes); // Use the routes defined in Complaint.js
app.use(adminRoutes);



// Db Connection
const connectDb = require('./src/config/atlasConn'); // Adjust the path as necessary
connectDb();


// Start the server
app.listen(8888, () => {
    console.log("Server is running on port 8888");
});