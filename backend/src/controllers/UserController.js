const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Require Models
const User = require('../Models/UserModel'); // Adjust the path as necessary


exports.signup = async (req, res) => {
    try{
        // console.log("Hello");
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

exports.loginUser= async (req,res)=>{
    const userId=req.user?.id
    if(userId){
      return res.status(200).json({message:"Logedin"})
    }
    try {
        const { email, password } = req.body;
        
        // existing user check
        const user=await User.findOne({email})
        if(!user){
          return res.status(404).json({message:"User Not Found"}) 
        }

        // compare password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
          return res.status(400).json({message:"Invalid Password"})
        }

        // generate JWT
        if(!process.env.JWT_SECRET){
          return res.status(500).json({message:"Server Error, Contact admin"})
            
        }
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );


      return  res.status(200).json({token})

    } catch (error) {
      return  res.status(500).json({error:error.message})
    }
}