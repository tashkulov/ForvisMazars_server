const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    person: { type: String, required: true },
    daysOfWeek: { type: [String], required: true }, // Массив дней недели
    task: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
