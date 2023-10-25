require("dotenv").config()
const app = require("./app")
const express = require("express")
const connectDatabase =require("./db/database")
const socketio = require("socket.io")
const {PORT} = process.env
const server = http.createServer(app);
const io =socketio(server)
app.use(express.json());

//connection to the database
connectDatabase();

io.on("connection",(socket)=>{
    console.log("user connected");
})

socket.on("joinRoom",(room)=>{
    socket.join(room);
})

socket.on("leaveRoom",(room)=>{
    socket.leave(room);
})

app.get("/",(req,res)=>{
    res.send("Hare Krishna")
})

app.listen(PORT,(req,res)=>{
 console.log(`server is listening to port ${PORT}`)    
})
