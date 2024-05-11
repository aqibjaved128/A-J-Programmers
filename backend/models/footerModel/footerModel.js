const mongoose = require('mongoose');

// Footer Schema 
const footerSchema = new mongoose.Schema({
    
    contactNo:{
        type:String,
        required:[true,"Please Enter Contact Number"]
    },
    contactAddress:{
        type:String,
        required:[true,"Please Enter Contact Address"]
    },
    copyright:{
        type:String,
        required:[true,"Please Enter Footer Copyright"]
    }

})


module.exports = mongoose.model("Footer",footerSchema);