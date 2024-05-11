const mongoose = require('mongoose');


// Home Schema 
const homeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Skill Name"]
    },
    skillsImages:{
        public_Id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
});

module.exports = mongoose.model("Home",homeSchema);