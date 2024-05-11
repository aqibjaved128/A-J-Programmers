const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const sendEmail = require("../../middlewares/sendMail");
const ContactUs = require("../../models/contactModel/contactUsModel");
const ErrorHandler = require("../../utils/ErrorHandler");

//  Contact Us Clients
exports.contactUs = catchAsyncErrors(async (req,res,next) => {

    const {
        name,
        email,
        country,
        message
    } = req.body;

    const contactUs = await ContactUs.create({
        name,
        email,
        country,
        message
    });

    const sendMessage = `My name is ${name} and my email is ${email}  and I am from ${country} and my message is ${message}`;

    try {

       await sendEmail({
            subject:"AJ-Programmers Contact Us",
            email:email,
            sendMessage

        })

        res.status(200).json({
            success: true,
            message:"Message sent successfully"
        })
        
    } catch (error) {
       return next(new ErrorHandler(error.message,400)); 
    }

});


// Contact Us Companies and Industries
exports.contactUsCompany = catchAsyncErrors(async (req,res,next) => {

    const {
        name,
        email,
        country,
        message,
        companyName
    } = req.body;

    const contactUs = await ContactUs.create({
        name,
        email,
        country,
        message,
        companyName
    });

    const sendMessage = `My name is ${name} and our comapny name is ${companyName}   and our company business email is ${email} and  we are from ${country} and our message is ${message}`;

    try {

        await sendEmail({
            subject:"AJ-Programmers Companies Contact Us",
            email:email,
            sendMessage
        })

        res.status(201).json({
            success: true,
            message:"Message sent successfully"
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404));
    }
});

