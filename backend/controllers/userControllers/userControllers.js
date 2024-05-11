const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const sendToken = require('../../middlewares/jwtToken');
const User = require('../../models/userModel/userModel');
const ErrorHandler = require('../../utils/ErrorHandler');
const adminMail = require('../../utils/adminMail');
const crypto = require("crypto");
const cloudinary = require("cloudinary");




// Login Admin 
exports.loginUser = catchAsyncErrors(async (req,res,next)=>{

    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password",400));
    };

    const user = await User.findOne({ email}).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password",400));
    };

    const isPasswordMatched = await  user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password",400));
    };

    sendToken(user,200,res)

 
});


// Logout admin
exports.logoutUser = catchAsyncErrors(async (req, res , next) => {

    res.cookie("token",null,{
        httpOnly:true,
        expires: new Date(Date.now())
    })
    

    res.status(200).json({
        success: true,
        message:"Logged out"
    })
});

// Admin Forgot Password  
exports.forgotPassword = catchAsyncErrors(async (req, res , next) => {

    const user = await User.findOne({email:req.body.email});

    if (!user) {
        return next(new ErrorHandler(`User not found`,404));
    };

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/admin/password/reset/${resetToken}`;

    const message = `Your Reset Password Url is \n\n ${resetPasswordUrl} \n\n If you not requested than please ignore it.`;
 
    try {

     await   adminMail({
            email: user.email,
            subject: `Admin Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,400));
    }
});

// Admin Reset Password  
exports.resetPassword = catchAsyncErrors(async (req,res,next) => {

    
    // Creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Finding user in database

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    // If user not found
    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",400))
    }

    // If Password and confirm Password are not matched

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("New Password and Confirm Password does not match",400))
    };

    // If both passwords are same then change password

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res)
});

// Get Login Admin Details 
exports.myDetails = catchAsyncErrors(async (req,res,next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

});

// Update Admin Password  
exports.updateAdminPassword = catchAsyncErrors(async (req,res,next) => {

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new ErrorHandler(`User not found`,400));
    };

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler(`Old password is incorrect`,400));
    };

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(`New Password And Confirm Password does not match`,400));
        
    };

    user.password = req.body.newPassword;

    await user.save({validateBeforeSave:false});

    res.status(200).json({
        success: true,
        user
    })

});


// Update Admin Profile Details 
exports.updateAdminProfile = catchAsyncErrors(async (req,res,next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_Id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            quality:80,
            progressive:true
        });

        newUserData.avatar = {
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!user) {
        return next(new ErrorHandler(`User not found`,404))
    };

    res.status(200).json({
        success: true,
        user
    })
});
