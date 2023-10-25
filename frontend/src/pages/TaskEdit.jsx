import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTasks } from '../context/TaskContext';
import { useParams, Link,useNavigate } from 'react-router-dom';


const TaskEdit = () => {
const navigate = useNavigate()
    const { taskId } = useParams();
  const { taskById,updateTask } = useTasks();

  // Fetch the task using the provided taskId
  const task = taskById(taskId)[0];

  const initialValues = {
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : '',
    assignTo: task.assignTo || '', // Initialize with the task's assignTo value
    status: task.status || 'todo', // Initialize with the task's status value
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    dueDate: Yup.date(),
    assignTo: Yup.string(), // You may want to add validation rules for assignTo
    status: Yup.string(), // You may want to add validation rules for status
  });

  const handleSubmit = async (values) => {
    try {
      const updatedTask = {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        assignTo: values.assignTo,
        status: values.status,
      };

      const response = await axios.put(`http://localhost:4000/api/v1/tasks/${task._id}`, updatedTask);

      // Handle successful update
      console.log('Task updated:', response.data);

      // Pass the updated task data to the parent component
      updateTask(response.data._id,response.data)
      navigate(`/tasks/${response.data._id}`)
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="dueDate">Due Date</label>
            <Field type="date" id="dueDate" name="dueDate" />
            <ErrorMessage name="dueDate" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="assignTo">Assign To</label>
            <Field type="text" id="assignTo" name="assignTo" />
            <ErrorMessage name="assignTo" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <Field as="select" id="status" name="status">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500" />
          </div>

          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskEdit;
