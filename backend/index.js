require("dotenv").config()
const app = require("./app")
const express = require("express")
const connectDatabase =require("./db/database")
const {PORT} = process.env
const cors = require("cors")
const corsOptions = {
    origin: 'http://127.0.0.1:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204, 
};

app.use(cors());
app.use(express.json());

//connection to the database
connectDatabase();

app.get("/",(req,res)=>{
    res.send("Hare Krishna")
})

app.listen(PORT,(req,res)=>{
 console.log(`server is listening to port ${PORT}`)    
})
