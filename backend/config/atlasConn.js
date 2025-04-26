const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async (req,res) => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Atlas connected successfully!");
    }
    catch(err){
        console.error("Error connecting to MongoDB Atlas:", err);
        process.exit(1); // Exit the process with failure
    }
}

module.exports =  connectDb ;