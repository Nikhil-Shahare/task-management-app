import React,{useState} from 'react';
import { useTasks } from '../context/TaskContext';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import UserSelector from '../component/UserSelector';
import axios from 'axios';

function ProjectDetail() {
  const {allUsers,user} = useAuth();
  const { projectById } = useProjects();
  const { getTasksForProject } = useTasks();
  const { projectId } = useParams();
  const tasksForProject = getTasksForProject(projectId);
  const projectDetails = projectById(projectId);
  const [addMember, setAddMember] = useState(false);
  const [removeMember, setRemoveMember] = useState(false);
  const [project ,setProject] = useState(projectDetails[0]);
 const ownerId = projectDetails[0].owner

  const todoTasks = tasksForProject.filter((task) => task.status === 'todo');
  const inProgressTasks = tasksForProject.filter((task) => task.status === 'inprogress');
  const completedTasks = tasksForProject.filter((task) => task.status === 'completed');

  const handleAddMember = async(selectedUsers) => {
    // Send a PUT request to add members
    const updatedMembers = [...projectDetails[0].members, ...selectedUsers];
    const membersObject ={
      members:updatedMembers
    }
        console.log("i am  updated member",membersObject)
        await axios.put(`http://localhost:4000/api/v1/getprojects/${projectId}`, {
          members: updatedMembers,
        }, {
          headers: {
            'user-id': user._id,
          },
        })
      .then(() => {
        setProject({ ...projectDetails[0], members: updatedMembers });
        setAddMember(false);
      })
      .catch((error) => {
        console.error('Error adding members:', error);
      });
  };


  const handleRemoveMember = (selectedUsers) => {
    // Send a PUT request to remove members
    const updatedMembers = projectDetails[0].members.filter(memberId => !selectedUsers.includes(memberId));

    axios.put(`http://localhost:4000/api/v1/getprojects/${projectId}`, {
      members: updatedMembers,
    })
      .then(() => {
        setProject({ ...project, members: updatedMembers });
        setRemoveMember(false);
      })
      .catch((error) => {
        console.error('Error removing members:', error);
      });
  };


  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-bold">{projectDetails[0].name}</h2>
        <h1 className="text-xl font-bold mt-4">Project Description</h1>
        <p>{projectDetails[0].description}</p>
      </div>
      <div className="mt-4">
      <div>
        <h3>Members:</h3>
        <ul>
          {project.members.map((memberId) => (
            <li key={memberId}>{memberId}</li>
          ))}
        </ul>
      </div>




        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setAddMember(true)}
        >
          Add Member
        </button>
        <button
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setRemoveMember(true)}
        >
          Remove Member
        </button>
      </div>
  

      {addMember && (
        <UserSelector
          users= {allUsers}
          ownerId={ownerId}
          onDone={handleAddMember}
        />
      )}

      {removeMember && (
        <UserSelector
          users={projectDetails[0].members} // Only show project members for removal
          ownerId={ownerId}
          onDone={handleRemoveMember}
        />
      )}



      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Tasks for this project:</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tasksForProject.map((task) => (
            <div key={task._id} className="bg-white rounded p-4 shadow-md">
              <Link to={`/tasks/${task._id}`}>
                <p className="text-lg font-semibold">{task.title}</p>
              </Link>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Todo Tasks:</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {todoTasks.map((task) => (
            <div key={task._id} className="bg-white rounded p-4 shadow-md">
              <Link to={`/tasks/${task._id}`}>
                <p className="text-lg font-semibold">
                  {task.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">In Progress Tasks:</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {inProgressTasks.map((task) => (
            <div key={task._id} className="bg-white rounded p-4 shadow-md">
              <Link to={`/tasks/${task._id}`}>
                <p className="text-lg font-semibold">{task.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Completed Tasks:</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {completedTasks.map((task) => (
            <div key={task._id} className="bg-white rounded p-4 shadow-md">
              <Link to={`/tasks/${task._id}`}>
                <p className="text-lg font-semibold">{task.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
