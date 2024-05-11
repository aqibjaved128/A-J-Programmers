const AboutTeam = require("../../models/aboutModel/aboutTeamModel");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const cloudinary = require("cloudinary");

/// Create Member Card --Admin
exports.createMemberCard = catchAsyncErrors(async (req,res,next) => {

    const {
        name,
        title
    } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"Member avatars",
        quality:80,
        progressive:true
    })
    const card = await AboutTeam.create({
        name,
        title,
        avatar:{
            public_Id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });


    res.status(201).json({
        success: true,
        card
    })
});



// Get All Cards 
exports.getAllMembersCards = catchAsyncErrors(async (req, res, next) => {

    const cardsCount = await AboutTeam.countDocuments();
    const cards = await AboutTeam.find();

    res.status(200).json({
        success: true,
        cardsCount,
        cards,
    })
});

// Delete Card  --Admin
exports.deleteMemberCard = catchAsyncErrors(async (req, res, next) => {

    const card = await AboutTeam.findById(req.params.id);

    if (!card) {
        return next(new ErrorHandler(`Couldn't find Member card. Invalid: ${req.params.id}`,400))
    };

    const avatarId = card.avatar.public_Id;

    await cloudinary.v2.uploader.destroy(avatarId);
    
    await card.deleteOne();

    res.status(200).json({
        success: true,
        message:"Member Card Deleted Successfully"
    })
})