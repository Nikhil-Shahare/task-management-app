const mongoose = require("mongoose");
const {Schema} = mongoose;

const createProject = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },]
})

module.exports = mongoose.model("project",createProject)