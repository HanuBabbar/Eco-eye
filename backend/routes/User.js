const express = require('express');
const app = express();
const cors = require('cors');


// Require controllers
const { signup } = require('../controllers/User'); // Adjust the path as necessary


// SignUp Route for user registration
app.post('/Signup',signup);

module.exports = app;