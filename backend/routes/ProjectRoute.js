const express = require("express")
const router = express.Router()
const Project = require("../models/Project")
const User = require("../models/User")

//helper function for checking if user is admin or not
const isAdmin =async(userId)=>{
    try{
        const user = await User.findOne({_id:userId});
        console.log("this one is a user",user)
  if(user && user.role === "admin"){
    return true;
  }
      return false;
  

    }catch(error){
      console.log("error while checking the admin role:",error);
      return false;
    }
}



//creating project

router.post("/project",async(req,res)=>{
    const project = req.body
    try{
        await Project.create(
            project
        )
        res.status(200).json({
            sucess:true,
            project
        })
    }catch{
        res.status(500).json({
            success:false,
        })
    }
})

//get projects for admin and users

router.get("/getprojects",async(req,res)=>{
    try{
        const userId = req.header("user-id");
        console.log('User ID:', userId);

        const userIsAdmin = await isAdmin(userId);
        console.log('User Is Admin:', userIsAdmin);

//fetching all the projects if user is admin
        if(userIsAdmin){
        const projects = await Project.find();
        res.json(projects);
        }else{
            //if not admin,then fetching projects for which user is either owner or member
            const projects = await Project.find({
                $or:[
                    {owner:userId},
                    {members:userId},
                ]
            });
            res.json(projects);
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
});

//getting a specific project

router.get('/getprojects/:id', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//update the project
router.put("/getprojects/:id", async (req, res) => {
    try {
      const userId = req.header('user-id'); // Get the user's ID from the request header.
  
      // Check if the user is an admin by awaiting the result of the `isAdmin` function.
      const userIsAdmin = await isAdmin(userId);
  
      const project = await Project.findById(req.params.id);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the user is the owner or an admin.
      if (project.owner.toString() === userId || userIsAdmin) {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
      } else {
        return res.status(403).json({ error: 'Permission denied' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Delete a project by ID (Delete operation)
router.delete('/getprojects/:id', async (req, res) => {
    try {
      const userId = req.header('user-id'); // Get the user's ID from the request header.
  
      // Check if the user is an admin by awaiting the result of the `isAdmin` function.
      const userIsAdmin = await isAdmin(userId);
  
      const project = await Project.findById(req.params.id);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the user is the owner or an admin.
      if (project.owner.toString() === userId || userIsAdmin) {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        res.json(deletedProject);
      } else {
        return res.status(403).json({ error: 'Permission denied' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  module.exports = router;