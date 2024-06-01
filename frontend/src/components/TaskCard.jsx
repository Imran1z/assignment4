import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task,onDelete,onEdit }) => {

  

  return (
    <div className="bg-white p-6 m-4 rounded-xl shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 w-72">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
        <input
          type="checkbox"
          checked={task.complete}
          // onChange={() => onToggleComplete(task.id)}
          className="form-checkbox h-6 w-6 text-blue-600"
        />
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>
      <div className="flex justify-end space-x-4 mb-4">
        <button
        onClick={onEdit}
         className="text-blue-500 hover:text-blue-700 ">
          <FaEdit size={18} />
        </button>
        <button 
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 "
        >
          <FaTrash size={18} />
        </button>
      </div>
      <p className="text-gray-400 text-sm mt-auto">{new Date(task.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default TaskCard;
