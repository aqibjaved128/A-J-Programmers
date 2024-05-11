const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const Footer = require('../../models/footerModel/footerModel');
const ErrorHandler = require('../../utils/ErrorHandler');



// Get Footer Details  
exports.getFooterDetails = catchAsyncErrors(async (req,res,next)=>{

    const footer = await Footer.find();

   
    res.status(200).json({
        success: true,
        footer
    })
});



// Update Footer Details  --Admin
exports.UpdateFooterDetails = catchAsyncErrors(async (req,res,next)=>{

    let footer = await Footer.findById(req.params.id);

    if (!footer) {
        return next(new ErrorHandler(`Footer not found with this id. Invalid: ${req.params.id}`,400));
    };

    footer = await Footer.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message:"Footer Details Updated successfully"
    })
});

