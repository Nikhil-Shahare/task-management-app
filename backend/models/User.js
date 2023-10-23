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
        default:"http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png",
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    }
})

module.exports = mongoose.model("user",createUser)