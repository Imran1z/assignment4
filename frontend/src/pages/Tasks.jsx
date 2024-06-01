import React, { useEffect, useState } from 'react';
import '../App.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    complete: false 
  })
  const [tasks, setTasks] = useState([]);

  const [taskError, setTaskError] = useState(null)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/v1/auth/signout');

      const data = await res.json();
      console.log("signed out");
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, use 'checked' directly
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  }
  
  

  const handleSubmit=async(e)=>{
    e.preventDefault();

    console.log(formData)


    try {
      const res =await fetch('/api/v1/task/create',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json();
      //console.log(data);
      if (data.success === false) {
        setTaskError(data.message)
        return;
      }

      closeModal()
      
    } catch (error) {
      setTaskError(error)
      closeModal()
    }
  
  }

  const fetchTasks = async () => {
    setTaskError(null);
    try {
      const res = await fetch('/api/v1/task/userTask');
      const data = await res.json();

      if (data.success === false) {
        setTaskError(data.message);
        return;
      }

      setTasks(data);
    } catch (error) {
      setTaskError('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isModalOpen,tasks]);


  const handleDelete = async (taskId) => {

    try {
      const res = await fetch(`/api/v1/task/delete/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return;
      }

      setTasks(tasks.filter(task => task._id !== taskId));

      // Optionally, call a function to update the parent component's state
      // to reflect the deleted task, for example:
      // onTaskDelete(task.id);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = async (taskId) => {

    try {
      setIsModalOpen(true)
      const res = await fetch(`/api/v1/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        return;
      }

      //setTasks(tasks.filter(task => task._id !== taskId));

      // Optionally, call a function to update the parent component's state
      // to reflect the deleted task, for example:
      // onTaskDelete(task.id);
      
    } catch (error) {
      console.error(error);
    }
  }


  

  return (
    <div className="flex flex-col md:flex-row min-h-content p-3 bg-gray-100">
      <div className="w-full md:w-1/6 bg-white p-5 m-2 rounded-lg shadow-md flex flex-col justify-between">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-gray-800">{currentUser.username}</h1>
          <h2 className="text-sm text-gray-500">{currentUser.email}</h2>
          <button onClick={handleAddTask} className="w-full py-2 px-4 mt-10 bg-gray-800 text-white rounded-md shadow hover:bg-gray-600">
            Add Task
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <button onClick={handleSignout} className="w-full py-2 px-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600 mt-auto">
            Sign Out
          </button>
        </div>
      </div>

      <div className="w-full md:w-5/6 bg-white p-5 m-2 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Notes:</h2>
        <div className="flex flex-wrap">
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={()=>handleDelete(task._id)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description</label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="complete"
            name="complete"
            checked={formData.complete}
            className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onChange={handleChange}
          />
          <label htmlFor="complete" className="block text-sm font-medium text-gray-700">Complete</label>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={closeModal} className="py-2 px-4 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600">
            Cancel
          </button>
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
            Save Task
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Tasks;
