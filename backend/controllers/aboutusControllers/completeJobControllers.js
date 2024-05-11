const Jobs = require("../../models/aboutModel/completeJobModel");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const cloudinary = require("cloudinary");


// Create COMPLETE JOB CARD  --Admin
exports.createJob = catchAsyncErrors(async (req,res,next)=>{

    const {
        title,
        subtitle,
    } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
        folder:"Cards",
        quality:80,
        progressive:true
    })
    const job = await Jobs.create({
        title,
        subtitle,
        image:{
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    res.status(200).json({
        success:true,
        job
    })
});


/// Get All Feedbacks
exports.getAllJobs = catchAsyncErrors(async (req,res,next)=>{
    const jobs = await Jobs.find();

    res.status(200).json({
        success: true,
        jobs
    })
});


// Delete feedback  --Admin
exports.deleteJob = catchAsyncErrors(async (req,res,next)=>{
    const job = await Jobs.findById(req.params.id);

    if (!job) {
        return next(new ErrorHandler(`Card not found with this id: ${req.params.id}`,400))
    };

    const imageId = job.image.public_Id;

    await cloudinary.v2.uploader.destroy(imageId);

    await job.deleteOne();

    res.status(200).json({
        success: true,
        message:"Card deleted successfully"
    })
})
