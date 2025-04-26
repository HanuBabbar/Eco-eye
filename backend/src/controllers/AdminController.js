const ComplaintModel = require('../Models/ComplaintModel');

exports.sendData = async (req,res)=>{
    const complaintData = await ComplaintModel.find({});
    res.status(200).json({
        success:true,
        complaintData:complaintData,
    })
}
