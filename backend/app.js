const express = require('express');
const app = express();
require('dotenv').config();
PORT = process.env.PORT || 5000; 

// DataBase
const dbConnect = require('./Conectivity/Database');
// dbConnect();



app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})