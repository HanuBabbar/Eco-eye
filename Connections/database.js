// Require the mongoose
const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = process.env.DATABASE_URL;

exports.dbConnect = ()=>{
    mongoose.connect(dbURL)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
}