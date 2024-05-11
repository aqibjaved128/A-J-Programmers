const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const Service = require("../../models/serviceModel/serviceModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const cloudinary = require("cloudinary");



// Create a Service --Admin
exports.createService = catchAsyncErrors(async (req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.logoImage,{
        folder:"Services",
        quality:80,
        progressive:true
    })

    const descriptionImage = await cloudinary.v2.uploader.upload(req.body.descriptionImage,{
        folder:"Services",
        quality:80,
        progressive:true
    })

    const {
        nameLink,
        name,
        miniDescription,
        title,
        subtitle,
        descriptiontitle,
        subDescription,
    }  = req.body;

    const service = await Service.create({
        nameLink,
        name,
        miniDescription,
        logoImage:{
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        },
        title,
        subtitle,
        descriptiontitle,
        subDescription,
        descriptionImage:{
            public_Id:descriptionImage.public_id,
            url:descriptionImage.secure_url
        }
    });

    res.status(201).json({
        success: true,
        service
    })
});


// Get All Services 
exports.getAllServices = catchAsyncErrors(async (req,res,next)=>{


    const servicesCount = await Service.countDocuments();
    const services = await Service.find();


    res.status(200).json({
        success:true,
        servicesCount,
        services
    })
});


// Get Single Service Details 
exports.getSingleServiceDetails = catchAsyncErrors(async (req,res,next)=>{

    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorHandler(`Service not found invalid id: ${req.params.id}`,400));
    };

    res.status(200).json({
        success: true,
        service
    })
});




// Delete Service  ---Admin
exports.deleteService = catchAsyncErrors(async (req,res,next) => {

    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorHandler(`Service not found invalid: ${req.params.id}`,400))
    };
    const logoId = service.logoImage.public_Id;

    await cloudinary.v2.uploader.destroy(logoId);

    const imageId = service.descriptionImage.public_Id;

    await cloudinary.v2.uploader.destroy(imageId);
    
    await service.deleteOne();

    res.status(200).json({
        success: true,
        message:"Service deleted successfully"
    })
});