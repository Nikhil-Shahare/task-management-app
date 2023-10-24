const express = require("express")
const router = express.Router()
const Task = require("../models/Tasks")
const User = require("../models/User")
const Project = require("../models/Project")
//helper function for checking if user is admin or not
const checkadmin =async(user)=>{
    try{
        const userid = await User.findOne({_id:user});
        // console.log("this one is a user which i am trying to obtain",userid)
  if(userid && userid.role === "admin"){
    return true;
  }
      return false;
  

    }catch(error){
      console.log("error while checking the admin role:",error);
      return false;
    }
}




// Create a new task (Create operation)
router.post('/tasks', async (req, res) => {
    try {
      const task = req.body
     
    const newTask = await Task.create(task)
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all tasks (Read operation)
router.get('/tasks', async (req, res) => {
    try {
      const userId = req.header('user-id'); // Get the user's ID from the request header.
  
      // Check if the user is an admin by awaiting the result of the `checkadmin` function.
      const userIsAdmin = await checkadmin(userId);
       console.log("checking admin",userIsAdmin)
      // Define the query to retrieve tasks.
      let query = {};
  
      if (!userIsAdmin) {
        // If the user is not an admin, filter tasks by the user's projects.
        const userProjects = await Project.find({
          $or: [
            { owner: userId },
            { members: userId },
          ]
        });
        //    console.log("this are user projects",userProjects)
        const projectIds = userProjects.map((project) => project._id);
        query = {
          project: { $in: projectIds },
        };
      }
      console.log("this one is query",query)
  
      const tasks = await Task.find(query);
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Get a specific task by ID (Read operation)
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task by ID (Update operation)
router.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task by ID (Delete operation)
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
