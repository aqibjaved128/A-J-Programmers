const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    image:{
        public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    title:{
        type:String,
        required:[true,"Please Enter Complete Jobs"]
    },
    subtitle:{
        type:String,
        required:[true,"Please Enter Title"]
    }
});


module.exports =  mongoose.model("Jobs",jobSchema);