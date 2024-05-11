const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const Contact = require("../../models/contactModel/contactModel");
const ErrorHandler = require("../../utils/ErrorHandler");



// Create Contact Page  --Admin
exports.createContactPage = catchAsyncErrors(async (req,res,next) => {

    const {
        country,
        address,
        telephone,
        phoneNo,
        email,
    } = req.body;

    const contact = await Contact.create({
        country,
        address,
        telephone,
        phoneNo,
        email,
    })

    res.status(201).json({
        success:true,
        contact
    })
});


// Get Contact Page Data  
exports.getContactPageData = catchAsyncErrors(async (req,res,next) => {

    const contact = await Contact.find();

    if (!contact) {
        return next(new ErrorHandler("Invalid Contact Id",404))
        
    };

    res.status(200).json({
        success:true,
        contact
    })
});




// Delete Contact Page Details  ---Admin
exports.deleteContactPageDetails = catchAsyncErrors(async (req,res,next) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorHandler("Invalid Contact Id",404))
    }

    await contact.deleteOne();


    res.status(200).json({
        success: true,
        message:"Contact Details Deleted Successfully"
    })
});