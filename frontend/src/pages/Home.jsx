import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import the Link component
import { useTasks } from '../context/TaskContext';
function Home() {
  const { user } = useAuth();
  const { tasks,setTasks } = useTasks();


  const [userProjects, setUserProjects] = useState([]);
  const [memberProjects, setMemberProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);


  const isAdmin = (user) => {
    if (user.role === "admin") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/getprojects', {
          headers: {
            'user-id': user._id,
          },
        });

        const userIsAdmin = isAdmin(user);

        const userOwnedProjects = response.data.filter(project => project.owner === user._id);
        const userMemberProjects = response.data.filter(project => project.members.includes(user._id));

        if (userIsAdmin) {
          setAllProjects(response.data);
        }

        setUserProjects(userOwnedProjects);
        setMemberProjects(userMemberProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [user]);

  useEffect(() => {
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
  }, [user]);

  return (
    <div className="p-4">
      <h1>Welcome, {user.firstName}!</h1>
      <h2 className="text-2xl font-bold mb-4">Projects Owned by User</h2>
      {userProjects.length === 0 ? (
        <div>No projects found for the user.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userProjects.map((project) => (
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
          {allProjects.length === 0 ? (
            <div>No projects found for admin.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allProjects.map((project) => (
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
