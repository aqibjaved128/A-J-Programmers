const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"Please Enter Project Name"]
    },
    techStack:{
        type:String,
        required:[true,"Please Enter Project Tech Stack"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Project Description"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Project Category"]
    }

});

module.exports = mongoose.model("Projects", projectsSchema);