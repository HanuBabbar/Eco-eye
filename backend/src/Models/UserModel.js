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
const {transporter} = require('../config/nodeMailer');
userSchema.post("save",async (doc)=>{
    console.log(doc);

    let info = transporter.sendMail({
        from:"karanmittal662@gmail.com",
        to:doc.email,
        subject:`Welcome to Eco-eye`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .header {
                    text-align: center;
                    color: #4CAF50;
                }
                .content {
                    margin-top: 20px;
                }
                .content ul {
                    padding-left: 20px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #777;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h2 class="header">Welcome to Eco-eye, ${doc.fullName}!</h2>
                <div class="content">
                    <p>We are thrilled to have you on board. Eco-eye is your trusted partner in managing your environmental and sustainability goals efficiently.</p>
                    <p>Here are some quick tips to get started:</p>
                    <ul>
                        <li>Log in to your account to explore our features.</li>
                        <li>Update your profile to personalize your experience.</li>
                        <li>Reach out to our support team if you have any questions.</li>
                    </ul>
                    <p>We hope you enjoy using Eco-eye!</p>
                    <p>Best regards,</p>
                    <p>The Eco-eye Team</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Eco-eye. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    })
})

 
module.exports = mongoose.model('User', userSchema);
