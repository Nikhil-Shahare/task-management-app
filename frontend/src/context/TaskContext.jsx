import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const taskById = (id) =>{
    const projectTasks = tasks.filter((task) => task.project === id) 
    return projectTasks
  }


  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
