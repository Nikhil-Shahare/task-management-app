import React, { useEffect, useState ,useRef} from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import the Link component
import { useTasks } from '../context/TaskContext';
import { useProjects } from '../context/ProjectContext';
function Home() {
  const { user,allUsers} = useAuth();
  const { tasks,setTasks } = useTasks();
 const {projects, getAllProjects,getMyProjects,sharedProjects,myProjects,memberProjects} = useProjects();

const renderCountForProject = useRef(0)
const renderCountForTask = useRef(0)
console.log("this are users from login",allUsers)

const isAdmin = (data) => {
    console.log("i am user in admin",data.role)
    if (data.role === "admin") {
        return true;
    }
    return false;
};


useEffect(() => {
    renderCountForProject.current +=1
    if(renderCountForProject.current===1){

        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/getprojects', {
                    headers: {
                        'user-id': user._id,
                    },
                });
                
                const userIsAdmin = isAdmin(user);
                console.log("i am userisadmin",userIsAdmin)
                getAllProjects(response.data)
                
                getMyProjects(response.data,user)
                sharedProjects(response.data,user)
                
                
                
                
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        
    fetchProjects();
}
  }, [user]);

  // Removed [user] as the dependency

useEffect(() => {
    renderCountForTask.current += 1
    if(renderCountForTask.current === 1){

        const fetchAllTasks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/tasks', {
                    headers: {
                        'user-id': user._id,
                    },
                });
                
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks in the project:', error);
            }
        };
        
        fetchAllTasks();
    }
    }, [user]);
console.log(" iam project in context",projects)
console.log("this are all users",allUsers)
return (
    <div className="p-4">
      <h1>Welcome, {user.firstName}!</h1>
      <h2 className="text-2xl font-bold mb-4">Projects Owned by User</h2>
      {myProjects.length === 0 ? (
        <div>No projects found for the user.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myProjects.map((project) => (
            <Link to={`/project/${project._id}`} key={project._id}>
              <div className="bg-white rounded p-4 shadow-md">
                {project.name}
              </div>
            </Link>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold my-4">Projects in which User is a Member</h2>
      {memberProjects.length === 0 ? (
        <div>No projects found for the user as a member.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {memberProjects.map((project) => (
            <Link to={`/project/${project._id}`} key={project._id}>
              <div className="bg-white rounded p-4 shadow-md">
                {project.name}
              </div>
            </Link>
          ))}
        </div>
      )}

      {isAdmin(user) && (
        <div>
          <h2 className="text-2xl font-bold my-4">All Projects</h2>
          {projects.length === 0 ? (
            <div>No projects found for admin.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {projects.map((project) => (
                <Link to={`/project/${project._id}`} key={project._id}>
                  <div className="bg-white rounded p-4 shadow-md">
                    {project.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <h2 className="text-2xl font-bold my-4">All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;