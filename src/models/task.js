const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: true },
  checklist: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checklists',
    required: true,
  }
});

module.exports = mongoose.model('Task', taskSchema);