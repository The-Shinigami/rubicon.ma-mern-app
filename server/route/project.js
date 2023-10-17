const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById } = require('../controller/project');

// Create a new project
router.post('/projects', createProject);

// Get all projects
router.get('/projects', getAllProjects);

// Get a project by ID
router.get('/projects/:projectId', getProjectById);

// Update a project by ID
router.put('/projects/:projectId', updateProjectById);

// Delete a project by ID
router.delete('/projects/:projectId', deleteProjectById);

module.exports = router;
