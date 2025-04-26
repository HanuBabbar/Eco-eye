const express = require('express');
// const app = express();
const cors = require('cors');

const router=express.Router();
// Require controllers
const { signup } = require('../controllers/UserController'); // Adjust the path as necessary


// SignUp Route for user registration
router.post('/Signup',signup);

module.exports = router;