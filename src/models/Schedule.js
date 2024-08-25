const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    person: { type: String, required: true },
    daysOfWeek: { type: [String] },
    task: { type: String }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
