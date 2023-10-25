const express = require("express")
const app = express();


const cors = require("cors")
const corsOptions = {
    origin: 'http://127.0.0.1:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204, 
};

app.use(cors());
//importing routes
const Project = require("./routes/ProjectRoute")
const Task = require("./routes/TaskRoute")
const User = require("./routes/UserRoute")
app.use(express.json())
app.use("/api/v1",Project)
app.use("/api/v1",Task)
app.use("/api/v1",User)



module.exports = app;