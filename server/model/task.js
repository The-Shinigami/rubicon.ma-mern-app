const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  label: { type: String, required: true },
  description: { type: String },
  starting_date: { type: Date },
  ending_date: { type: Date },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create models from the schemas
const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
