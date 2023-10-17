const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById } = require('../controller/task');

// Create a new task
router.post('/tasks', createTask);

// Get all tasks
router.get('/tasks', getAllTasks);

// Get a task by ID
router.get('/tasks/:taskId', getTaskById);

// Update a task by ID
router.put('/tasks/:taskId', updateTaskById);

// Delete a task by ID
router.delete('/tasks/:taskId', deleteTaskById);

module.exports = router;
