const express = require('express');
const app = express();
const cors = require('cors'); 
const mongoose = require('mongoose');

// Route for image upload

const upload = require('../middleware/multer'); // Adjust the path as necessary
const {uploadImage,updateImage} = require("../controllers/ImageUpload");
const {auth} = require('../middleware/auth'); // Adjust the path as necessary


app.post('/upload',auth, upload.single('image') , uploadImage);
app.put('admin/complaints/:id',auth, updateImage); // Update complaint status

module.exports = app;