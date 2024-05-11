const mongoose = require('mongoose');

// Create Contact Us Schema 
const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
    },
    country:{
        type:String,
        required:[true,"Please Enter Your Country Name"],
    },
    message:{
        type:String,
        required:[true,"Please Enter Your Message"]
    },
    companyName:{
        type:String
    }
})

module.exports = mongoose.model("ContactUs",contactUsSchema);