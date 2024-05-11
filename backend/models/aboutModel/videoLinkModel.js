const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    link:{
        type:String,
        required:[true,"Please Enter Youtube Video Link"]
    }
})


module.exports =  mongoose.model("Video",videoSchema);
