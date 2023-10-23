const express = require("express")
const app = express();

//importing routes
const Project = require("./routes/ProjectRoute")
const Task = require("./routes/TaskRoute")
const User = require("./routes/UserRoute")
app.use(express.json())
app.use("/api/v1",Project)
app.use("/api/v1",Task)
app.use("/api/v1",User)



module.exports = app;