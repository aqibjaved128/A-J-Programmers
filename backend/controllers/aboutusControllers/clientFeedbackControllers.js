const Feedback = require("../../models/aboutModel/clientFeedbackModel");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const cloudinary = require("cloudinary");


// Create New Feedback  --Admin
exports.createFeedback = catchAsyncErrors(async (req,res,next)=>{
    const {
        name,
        title,
        description,
    } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"Feedback",
        quality:80,
        progressive:true
    })
    const feedback = await Feedback.create({
        name,
        title,
        description,
        avatar:{
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    res.status(200).json({
        success:true,
        feedback
    })
});


/// Get All Feedbacks
exports.getAllFeedbacks = catchAsyncErrors(async (req,res,next)=>{
    const feedbacks = await Feedback.find();

    res.status(200).json({
        success: true,
        feedbacks
    })
});


// Delete feedback  --Admin
exports.deleteFeedback = catchAsyncErrors(async (req,res,next)=>{
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
        return next(new ErrorHandler(`Feedback not found with this id: ${req.params.id}`,400))
    };

    const avatarId = feedback.avatar.public_Id;

    await cloudinary.v2.uploader.destroy(avatarId);


    await feedback.deleteOne();

    res.status(200).json({
        success: true,
        message:"Feedback deleted successfully"
    })
})