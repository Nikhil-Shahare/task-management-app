import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useParams, Link } from 'react-router-dom';

const TaskDetail = () => {
  const { taskId } = useParams();
  const { taskById } = useTasks();

  // Fetch the task using the provided taskId
  const task = taskById(taskId)[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="mt-2">Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {new Date(task.dueDate).toDateString()}</p>

      {/* Edit Task Button */}
      <Link
        to={`/tasks/${taskId}/edit`}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        Edit Task
      </Link>

      {/* Back to Project Button */}
      <Link
        to={`/project/${task.project}`}  // Replace 'projects' with the actual route for the project page
        className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-block"
      >
        Back to Project
      </Link>
    </div>
  );
};

export default TaskDetail;
