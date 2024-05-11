const mongoose = require('mongoose');


// Contact Model
const contactSchema = new mongoose.Schema({

    country:{
        type:String,
        required:[true,"Please Enter Contact Country Name"]
    },
    address:{
        type:String,
        required:[true,"Please Enter Contact Address"]
    },
    telephone:{
        type:String,
        required:[true,"Please Enter Contact telephone Number"]
    },
    phoneNo:{
        type:String,
        required:[true,"Please Enter Contact Phone Number"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Contact Email"]
    },
});

module.exports = mongoose.model("Contact",contactSchema);