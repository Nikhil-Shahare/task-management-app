import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {


  const [projects, setProjects] = useState([]);
  const [myProjects,setMyProjects] = useState([]);
  const [memberProjects, setMemberProjects] = useState([]);



  const getAllProjects = (data)=>{
       setProjects(data)
  }

  const getMyProjects = (data,user)=>{
    const Projects = data.filter(project => project.owner === user._id);
    setMyProjects(Projects)
  }

  const projectById = (id) => {
    console.log("i am projectbyid running")
    const project = projects.filter((project) => project._id === id);
    return project;
  };

  const sharedProjects = (data,user) =>{
    const sharedProjects = data.filter(project => project.members.includes(user._id));
    setMemberProjects(sharedProjects);
  } 

   
  

  return (
    <ProjectContext.Provider value={{ projects, getAllProjects, projectById,getMyProjects,sharedProjects,myProjects,memberProjects,}}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
