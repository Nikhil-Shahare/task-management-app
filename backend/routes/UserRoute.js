const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const bcrypt = require("bcrypt")

//helper function for checking if user is admin or not
const isAdmin =async(userId)=>{
    try{
        const user = await User.findById(userId);
  if(user && user.role === "admin"){
    return true;
  }
  return false;

    }catch(error){
      console.log("error while checking the admin role:",error);
      return false;
    }
}






// Create a new user (Create operation)
router.post('/users', async (req, res) => {
    try {
        const user = req.body
     const existingUser = await User.findOne({ email: user.email });

     //checking if user already exist
     if(existingUser){
        return res.status(400).json({error:"user already exist"})
     }
     const hashpassword = await bcrypt.hash(user.password,10)

   const newUser = await User.create({...user,password:hashpassword})
    res.status(201).json({success:"true",newUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users (Read operation)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific user by ID (Read operation)
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user by ID (Update operation)
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by ID (Delete operation)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body; // Assuming you pass the user's ID and role in the request body

    // Check if the user is an admin or if the user is deleting their own account
    if (role === 'admin' || id === userId) {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(deletedUser);
    } else {
      return res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//loginin route

router.post('/users/login', async (req, res) => {
    try {
      const userData = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email: userData.email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(userData.password, user.password);
  
      if (passwordMatch) {
        // Passwords match, you can proceed with user authentication here
        res.json({ message: 'User authenticated successfully', user });
      } else {
        // Passwords do not match
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
