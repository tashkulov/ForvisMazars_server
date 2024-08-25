const Task = require('../models/TaskSchema');
const User = require('../models/UserSchema');

// Получение всех задач
exports.getAllTasks = async () => {
    try {
        return await Task.find().populate('person');
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
};

// Создание новой задачи
exports.createTask = async (taskData) => {
    try {

        const user = await User.findById(taskData.person);
        if (!user) {
            throw new Error('User not found');
        }

        const task = new Task(taskData);
        const savedTask = await task.save();
        console.log('Task created successfully:', savedTask);

        return savedTask;
    } catch (error) {
        throw new Error('Error creating task: ' + error.message);
    }
};

exports.updateTask = async (id, taskData) => {
    try {
        const task = await Task.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }

        task.person = taskData.person || task.person;
        task.daysOfWeek = Array.isArray(taskData.daysOfWeek) ? taskData.daysOfWeek : [taskData.daysOfWeek];
        task.task = taskData.task || task.task;

        return await task.save();
    } catch (error) {
        throw new Error('Error updating task: ' + error.message);
    }
};

exports.deleteTask = async (id) => {
    try {
        const result = await Task.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('Task not found');
        }

        return true;
    } catch (error) {
        throw new Error('Error deleting task: ' + error.message);
    }
};
