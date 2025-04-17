const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userName :{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
    },
    phnNum:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    pinCode:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema);