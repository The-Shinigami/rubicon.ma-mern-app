const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
  label: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Active', 'Completed', 'On Hold'], default: 'Active' },
  starting_date: { type: Date },
  ending_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };