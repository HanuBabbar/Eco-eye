const express = require('express');
const app = express();
const cors = require('cors'); 
const mongoose = require('mongoose');

// Route for image upload

const upload = require('../middleware/multer'); // Adjust the path as necessary
const {uploadImage} = require("../controllers/ImageUpload");


app.post('/upload', upload.single('image') , uploadImage);

module.exports = app;