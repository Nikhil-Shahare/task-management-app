import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { taskById } = useTasks();
  const { projectId } = useParams();
    console.log("projectdetailid",projectId)
  const tasksForProject = taskById(projectId); // Use the project ID to retrieve tasks
console.log("this is task for this project",tasksForProject)
  return (
    <div>
      <h2>Project Detail Page</h2>
      <h3>Tasks for this project:</h3>
      <ul>
        {tasksForProject.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetail;