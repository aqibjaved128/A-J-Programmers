const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const Projects = require('../../models/projectsModel/projectsModel');
const ErrorHandler = require('../../utils/ErrorHandler');
const ApiFeatures = require('../../utils/apifeature');
const cloudinary = require("cloudinary");



// Create a new Project --Admin
exports.createProject = catchAsyncErrors(async (req,res,next) => {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "projects",
        quality:80,
        progressive:true
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;

    const project = await Projects.create(req.body);

    res.status(201).json({
        success: true,
        project
    })
});

// Get All Projects  --Admin
exports.getAllAdminProjects = catchAsyncErrors(async (req,res,next) => {

    const projects = await Projects.find();

    res.status(200).json({
        success: true,
        projects
    })
});

// Get All Projects 
exports.getAllProjects = catchAsyncErrors(async (req,res,next) => {


    const projectsCount = await Projects.countDocuments();

    const resultPerPage = 8;

    const apifeatures = new ApiFeatures(Projects.find(),req.query).filter().pagination(resultPerPage);

    const projects = await apifeatures.query;




    res.status(200).json({
        success: true,
        projectsCount,
        resultPerPage,
        projects,
    })
});


// Get Single Project Details 
exports.getSingleProjectDetails = catchAsyncErrors(async (req,res,next) => {
    const project = await Projects.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found",404))
    };

    res.status(200).json({
        success: true,
        project
    })
});



// Delete Project  ---Admin
exports.deleteProject = catchAsyncErrors( async (req,res,next) => {
    const project = await Projects.findById(req.params.id);

    if (!project) {
        return next(new ErrorHandler("Project not found",404))
    };

    for (let i = 0; i < project.images.length; i++) {
        await cloudinary.v2.uploader.destroy(project.images[i].public_id)
    }
    await project.deleteOne();

    res.status(200).json({
        success: true,
        message:"Project deleted successfully"
    })
});