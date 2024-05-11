const mongoose = require('mongoose');


// Client Feedback Model
 const feedbackSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true,"Please Enter Feedback Description"]
    },
    avatar:{
        public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    name:{
        type:String,
        required:[true,"Please Enter Client Name"]
    },
    title:{
        type:String,
        required:[true,"Please Enter Client Title"]
    }

});


module.exports = mongoose.model("Feedback",feedbackSchema);