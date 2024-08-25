const scheduleService = require('../services/scheduleService');

exports.getSchedule = async (req, res) => {
    try {
        const schedule = await scheduleService.getAllBlocks();
        res.json(schedule);
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        res.status(500).json({ message: 'Error fetching schedule data' });
    }
};

exports.createBlock = async (req, res) => {
    try {
        const newBlock = await scheduleService.createBlock(req.body);
        res.status(201).json(newBlock);
    } catch (error) {
        console.error('Error creating new block:', error);
        res.status(500).json({ message: 'Error creating new block' });
    }
};

exports.updateBlock = async (req, res) => {
    try {
        const updatedBlock = await scheduleService.updateBlock(req.params.id, req.body);
        if (!updatedBlock) {
            return res.status(404).json({ message: 'Block not found' });
        }
        res.json(updatedBlock);
    } catch (error) {
        console.error('Error updating block:', error);
        res.status(500).json({ message: 'Error updating block' });
    }
};

exports.deleteBlock = async (req, res) => {
    try {
        const result = await scheduleService.deleteBlock(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Block not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting block:', error);
        res.status(500).json({ message: 'Error deleting block' });
    }
};
