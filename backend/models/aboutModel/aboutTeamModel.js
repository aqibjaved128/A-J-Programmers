const mongoose = require('mongoose');

// For Team Model
const teamCardSchema = new mongoose.Schema({
    avatar:{
        public_Id:{
            type:String,
            requried:true
        },
        url:{
            type:String,
            required:true
        }
    },
    name:{
        type:String,
        required:[true,"Please Enter Developer Name"]
    },
    title:{
        type:String,
        required:[true,"Please Enter Developer Title"]
    }

});


module.exports = mongoose.model("TeamCard",teamCardSchema);