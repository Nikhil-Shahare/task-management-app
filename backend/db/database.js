const mongoose = require("mongoose");
const {MONGO_URI}=process.env


const connector = () =>{
    mongoose.connect(MONGO_URI)
    .then( (data)=>console.log(`Mongodb connected with server: ${data.connection.host}`))
    .catch((err)=> console.log(err))
}

module.exports = connector;
