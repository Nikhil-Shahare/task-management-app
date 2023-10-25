require("dotenv").config()
const app = require("./app")
const express = require("express")
const connectDatabase =require("./db/database")
const {PORT} = process.env

app.use(express.json());

//connection to the database
connectDatabase();

app.get("/",(req,res)=>{
    res.send("Hare Krishna")
})

app.listen(PORT,(req,res)=>{
 console.log(`server is listening to port ${PORT}`)    
})
