const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    daysOfWeek: { type: [String] },
    task: { type: String }
});

module.exports = mongoose.model('Task', TaskSchema);
