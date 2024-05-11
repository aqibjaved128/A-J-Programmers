const mongoose = require('mongoose');


// Service Model 
const serviceSchema = new mongoose.Schema({
    nameLink:{
        type:String,
        required:[true,"Please Enter Link Name"]
    },
 
    logoImage: {
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
        required:[true,"Please Enter Service Name"]
    },
    miniDescription:{
        type:String,
        required:[true,"Please Enter Service Mini Description"]
    },
    title:{
        type:String,
        required:[true,"Please Enter Service Title"]
    },
    subtitle:{
        type:String,
        required:[true,"Please Enter Service Subtitle"]
    },
    descriptiontitle:{
        type:String,
        required:[true,"Please Enter Description Title"]
    },
  
    subDescription:{
        type:String,
        required:[true,"Please Enter Sub Description"]
    },
   
    descriptionImage:{
            public_Id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ,
 
});


module.exports = mongoose.model("Service",serviceSchema);