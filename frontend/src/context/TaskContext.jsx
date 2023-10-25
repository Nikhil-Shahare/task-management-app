import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
 
  const getTasksForProject = (id) =>{
    const projectTasks = tasks.filter((task) => task.project === id) 
    return projectTasks
  }
 const taskById = (id)=>{
    const  task = tasks.filter((data)=>data._id === id)
    return task
 }

// Function to update a task by its ID
const updateTask = (taskId, updatedData) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        // Merge the updatedData into the task using spread operator
        return { ...task, ...updatedData };
      }
      return task;
    });

    setTasks(updatedTasks);
  };


  return (
    <TaskContext.Provider value={{ tasks, setTasks,getTasksForProject,taskById,updateTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;