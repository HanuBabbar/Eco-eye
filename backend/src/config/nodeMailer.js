const nodeMailer = require('nodemailer');
require('dotenv').config();

exports.transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
},()=>{
    console.log("SMTP Server Connected!!");
})