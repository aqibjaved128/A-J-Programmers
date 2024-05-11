const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary");



// UNcaught Expection Error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due uncaught exception`);
    process.exit(1);
})



// Config
dotenv.config({path:"backend/config/config.env"})


// Connect Database
connectDatabase()

// Cloudinary
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

// Creating a  server
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// Unhandled Promises Rejection
process.on("unhandledRejection",(err)=>{
    console.log(err.message);
    console.log(`Server is shutting down due to unhandled Promises Rejection`);
    server.close(()=>{
        process.exit(1)
    })
});