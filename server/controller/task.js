const { Task } = require('../model/task');

// Create a new task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving task' });
  }
};

// Update a task by ID
const updateTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByIdAndRemove(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
