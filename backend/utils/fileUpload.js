

const cloudinary = require("cloudinary").v2;
const fs = require('fs');
require("dotenv").config();

cloudinary.config({
    // add to .env
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.uploadOnCloudinary = async (localFilePath)=>{
    try{

        if(!localFilePath){
            return null;
        }
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"image"
        })
        fs.unlinkSync(localFilePath)
        return response;

    }catch (error){

        fs.unlinkSync(localFilePath)
        console.log(error);
        return null;
    }
}