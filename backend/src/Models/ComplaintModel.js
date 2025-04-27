const mongoose = require('mongoose');
const User = require('../Models/RequestModel');
 
const complaintSchema = new mongoose.Schema({
    complaintLocation:{
        type: String,
        // required: true
    },
    complaintDate:{
        type:Date,
        default: Date.now,
    },
    complaintDescription:{
        type: String,
        // required: true
    },
    complaintStatus:{
        type: Boolean,
        default: false,
    },
    complaintImage:{
        type: String,
        // required: true
    },
    aiOpinion:{
        type: String,
        // required: true
    },
    complaintUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    email:{
        type:String,
    }
});

const {transporter} = require('../config/nodeMailer');
complaintSchema.post("save",async (doc)=>{
    // console.log(doc);

    let info = transporter.sendMail({
        from:"karanmittal662@gmail.com",
        to:doc.email,
        subject:`Welcome to Eco-eye`,
        html: `<html>
        <body>
            <h1>Welcome to Eco-Eye</h1>
            <p>Dear User,</p>
            <p>Thank you for submitting your complaint. Below are the details of your complaint:</p>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <th>Complaint Location</th>
                    <td>${doc.complaintLocation || "N/A"}</td>
                </tr>
                <tr>
                    <th>Complaint Date</th>
                    <td>${doc.complaintDate.toDateString()}</td>
                </tr>
                <tr>
                    <th>Complaint Description</th>
                    <td>${doc.complaintDescription || "N/A"}</td>
                </tr>
                <tr>
                    <th>Complaint Status</th>
                    <td>${doc.complaintStatus ? "Resolved" : "Pending"}</td>
                </tr>
                <tr>
                    <th>AI Opinion</th>
                    <td>${doc.aiOpinion || "N/A"}</td>
                </tr>
            </table>
            <h2>Timeline</h2>
            <p>Your complaint will be addressed within the next 10 days. Below is the timeline:</p>
            <ul>
                <li>Day 1-3: Complaint review and verification</li>
                <li>Day 4-6: Assignment to the appropriate team</li>
                <li>Day 7-9: Resolution process</li>
                <li>Day 10: Final status update</li>
            </ul>
            <p>We appreciate your patience and cooperation.</p>
            <p>Best regards,</p>
            <p>The Eco-Eye Team</p>
        </body>
        </html>`,
    })
})

module.exports = mongoose.model('Complaint', complaintSchema);