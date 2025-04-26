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
    complaintUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }
});

module.exports = mongoose.model('Complaint', complaintSchema);