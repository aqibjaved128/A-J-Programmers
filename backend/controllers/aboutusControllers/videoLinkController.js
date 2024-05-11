const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const VideoLink = require("../../models/aboutModel/videoLinkModel");
const ErrorHandler = require("../../utils/ErrorHandler");

// Create Video Link  --Admin
exports.createVideoLink = catchAsyncErrors(async (req,res,next)=>{
    const video = await VideoLink.create(req.body);


    res.status(201).json({
        success: true,
        video
    })
});


// Get Video Link 
exports.getVideoLink = catchAsyncErrors(async (req,res,next) => {

    const video = await VideoLink.find();

    res.status(200).json({
        success: true,
        video
    })
});


// Delete Video Link  ---Admin
exports.deleteVideoLink = catchAsyncErrors(async (req,res,next) => {

    const video = await VideoLink.findById(req.params.id);

    if (!video) {
        return next(new ErrorHandler(`Invalid Id`,400))
    };


    await video.deleteOne();

    res.status(200).json({
        success: true,
        message:"Video deleted successfully"
    })
});