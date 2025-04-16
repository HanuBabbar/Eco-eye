// Require all the necessary modules or files

const express = require('express');
const app = express();  
require('dotenv').config();
PORT = process.env.PORT || 4567;

// Databse connection
const dbConnect = require('./Connections/database.js');
dbConnect.dbConnect();


// Listining the Port
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})