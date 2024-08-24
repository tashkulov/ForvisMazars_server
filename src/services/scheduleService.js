const Schedule = require('../models/Schedule');

exports.getAllBlocks = async () => {
    return Schedule.find();
};

exports.createBlock = async (blockData) => {
    const schedule = new Schedule(blockData);
    return schedule.save();
};

exports.updateBlock = async (id, blockData) => {
    const schedule = await Schedule.findById(id);
    if (!schedule) return null;

    schedule.person = blockData.person || schedule.person;
    schedule.daysOfWeek = blockData.daysOfWeek || schedule.daysOfWeek;
    schedule.task = blockData.task || schedule.task;

    return schedule.save();
};

exports.deleteBlock = async (id) => {
    const result = await Schedule.deleteOne({ _id: id });
    return result.deletedCount > 0;
};
