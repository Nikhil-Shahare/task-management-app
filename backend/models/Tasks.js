const mongoose = require("mongoose");
const {Schema}= mongoose;

const createTask = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    assignTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        enum:["todo","inprogress","completed"],
        default:"todo",
    },
    dueDate:Date

})

module.exports = mongoose.model("task",createTask)