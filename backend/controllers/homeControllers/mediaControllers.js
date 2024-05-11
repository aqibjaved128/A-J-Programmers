const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const Media = require("../../models/homeModel/mediaModel");
const ErrorHandler = require("../../utils/ErrorHandler");

// Create Socail Media Links --Admin
exports.createMedia = catchAsyncErrors(async (req,res,next) => {

    const media = await Media.create(req.body);

    res.status(201).json({
        success: true,
        media
    })
});

// Get All Media Links 
exports.getAllMediaLinks = catchAsyncErrors(async (req,res,next) => {
    const media = await Media.find();

    res.status(200).json({
        success: true,
        media
    })
});


// Delete Media Links --Admin
exports.deleteMedia = catchAsyncErrors(async (req,res,next) => {
    const media = await Media.findById(req.params.id);

    if (!media) {
        return next(new ErrorHandler(`Media links not found with this id: ${req.params.id}`,400))
    };

    await media.deleteOne();

    res.status(200).json({
        success: true,
        message:"Media Links Deleted Successfully"
    })
});

