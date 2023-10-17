
const { Project } = require('../model/project');

// Create a new project
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving projects' });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving project' });
  }
};

// Update a project by ID
const updateProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
};

// Delete a project by ID
const deleteProjectById = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findByIdAndRemove(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
