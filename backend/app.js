const express = require('express');
const app = express();
require('dotenv').config();
PORT = process.env.PORT || 5000; 


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})