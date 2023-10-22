const mongoose = require("mongoose")
const {Schema}= mongoose;


const createUser = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"image",
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model("user",createUser)