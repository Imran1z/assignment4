import express from 'express';
import { createTask, getAllTasks, getTasksByUser, updateTask, deleteTask } from '../controllers/task.controller.js';
import { verifyToken } from '../utils/verifyUser.js'; // Middleware to verify JWT and set req.user

const router = express.Router();

// Create a new task
router.post('/create', verifyToken, createTask);

// Get all tasks
router.get('/getAll', verifyToken, getAllTasks);

// Get tasks by user
router.get('/userTask', verifyToken, getTasksByUser);

// Update a task
router.put('/update/:id', verifyToken, updateTask);

// Delete a task
router.delete('/delete/:id', verifyToken, deleteTask);

export default router;
