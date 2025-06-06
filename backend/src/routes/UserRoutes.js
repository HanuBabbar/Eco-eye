const express = require('express');
const app = express();
const cors = require('cors');

// const router=express.Router();
const {auth} =require('../middleware/auth')
// Require controllers
const { signup,loginUser,getUser } = require('../controllers/UserController'); // Adjust the path as necessary


// SignUp Route for user registration
app.get('/getUser',auth,getUser)
app.post('/Signup',signup);
app.post('/login',loginUser)

module.exports = app;