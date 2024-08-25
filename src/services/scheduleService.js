const Schedule = require('../models/Schedule');

exports.getAllBlocks = async () => {
    try {
        return await Schedule.find();
    } catch (error) {
        throw new Error('Error fetching schedule data');
    }
};

exports.createBlock = async (blockData) => {
    try {
        const schedule = new Schedule({
            person: blockData.person,
            daysOfWeek: Array.isArray(blockData.daysOfWeek) ? blockData.daysOfWeek : [blockData.daysOfWeek],
            task: blockData.task
        });
        return await schedule.save();
    } catch (error) {
        throw new Error('Error creating new block');
    }
};

exports.updateBlock = async (id, blockData) => {
    try {
        const schedule = await Schedule.findById(id);
        if (!schedule) return null;

        schedule.person = blockData.person || schedule.person;
        schedule.daysOfWeek = Array.isArray(blockData.daysOfWeek) ? blockData.daysOfWeek : [blockData.daysOfWeek];
        schedule.task = blockData.task || schedule.task;

        return await schedule.save();
    } catch (error) {
        throw new Error('Error updating block');
    }
};

exports.deleteBlock = async (id) => {
    try {
        const result = await Schedule.deleteOne({ _id: id });
        return result.deletedCount > 0;
    } catch (error) {
        throw new Error('Error deleting block');
    }
};
