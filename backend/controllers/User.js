const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Require Models
const User = require('../models/User'); // Adjust the path as necessary


exports.signup = async (req, res) => {
    try{
        const { fullName, email, password,confirmPassword } = req.body;
        console.log("User created:", fullName, email, password );
        // validate the data
        if(!fullName || !email || !password || !confirmPassword){
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        // Confirm the Password
        if(password!=confirmPassword){
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }
        // check if user already exists
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            console.log("User already exists:", email);
            res.status(400).json({ success: false, message: "User already exists" });
        }
        // create new user after hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            password:hashedPassword,
        });
        console.log("User created successfully:", email);
        res.status(201).json({ success: true, message: "User created successfully" });
    }
    catch(err){
        console.error("Error during signup:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}