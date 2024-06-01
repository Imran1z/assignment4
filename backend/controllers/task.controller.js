import Task from '../models/task.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new task
export const createTask = async (req, res, next) => {
  const { title, description,complete } = req.body;
  const userId = req.user.id;
   // Assuming req.user is set by the authentication middleware

   console.log(title,description,userId)

  try {
    const newTask = new Task({
      title,
      description,
      complete,
      user: userId,
    });

    const savedTask = await newTask.save();
    console.log(savedTask)
    res.status(201).json(savedTask);
  } catch (error) {
    next(errorHandler(500, 'Failed to create task'));
  }
};

// Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    next(errorHandler(500, 'Failed to retrieve tasks'));
  }
};

// Get tasks by user
export const getTasksByUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    next(errorHandler(500, 'Failed to retrieve user tasks'));
  }
};

// Update a task
export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, complete } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, complete },
      { new: true }
    );

    if (!updatedTask) return next(errorHandler(404, 'Task not found'));

    res.status(200).json(updatedTask);
  } catch (error) {
    next(errorHandler(500, 'Failed to update task'));
  }
};

// Delete a task
export const deleteTask = async (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) return next(errorHandler(404, 'Task not found'));

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(errorHandler(500, 'Failed to delete task'));
  }
};
