const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const Home = require('../../models/homeModel/homeModel');
const ErrorHandler = require('../../utils/ErrorHandler');
const cloudinary = require("cloudinary");

// Create A Home Page  --Admin
exports.createHomePage = catchAsyncErrors(async (req,res,next) => {

 
    const myCloud = await cloudinary.v2.uploader.upload(req.body.skillsImages,{
        folder: "Home",
        quality:80,
        progressive:true
    });

    const {name} = req.body;

    const home = await Home.create({
        name,
        skillsImages:{
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });


    res.status(201).json({
        success: true,
        home
    })
});

// Get Home Details  
exports.getHomeDetails = catchAsyncErrors(async (req,res,next) => {

    const homes = await Home.find();

 

    res.status(200).json({
        success: true,
        homes
    })
})




// Delete Home Details  --Admin
exports.deleteHomeDetails = catchAsyncErrors(async (req,res,next) => {

    
    const home = await Home.findById(req.params.id);

    if (!home) {
        return next(new ErrorHandler(`Home Details not found. Invalid: ${req.params.id}`,400));
    };

    await cloudinary.v2.uploader.destroy(home.skillsImages.public_Id);
    
    await home.deleteOne();

    res.status(200).json({
        success: true,
        message:"Home Details Deleted Successfully"
    })
});
