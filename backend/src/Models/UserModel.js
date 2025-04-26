const mongoose = require('mongoose');


// Model for user
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    joiningDate:{
        type:Date,
        default:Date.now,
    }
});

// Export the model and send mail after saving the user
// const {transporter} = require('../config/nodeMailer');
// userSchema.post("save",async (doc)=>{
//     console.log(doc);

//     let info = transporter.sendMail({
//         from:"karanmittal662@gmail.com",
//         to:doc.email,
//         subject:`Welcome to MilkConnect`,
//         html:`<h4>Dear ${doc.fullName}`,
//     })
// })

 
module.exports = mongoose.model('User', userSchema);
