const mongoose = require("mongoose");


const mediaSchema = new mongoose.Schema({
    facebook:{
        type:String
    },
    linkedin:{
        type:String
    },
    youtube:{
        type:String
    },
    instagram:{
        type:String
    }
})


module.exports = mongoose.model("media",mediaSchema);