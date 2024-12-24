const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Ready For Review', 'Ready For Live', 'Completed', 'On Hold'], default: 'Not Started'},
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium'},
  dueDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
