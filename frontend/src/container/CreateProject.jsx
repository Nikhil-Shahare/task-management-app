import React, { useState } from 'react';

const CreateProject = ({ onCreateProject }) => {
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to send the project data to the server and create the project
    onCreateProject(project); // Pass the project data to the parent component
    setShowModal(false); // Close the modal after submission
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create Project
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="description"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Create Project
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProject;