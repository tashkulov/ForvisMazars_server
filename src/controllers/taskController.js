const taskService = require('../services/taskService');
const User = require('../models/UserSchema');
const Task = require('../models/TaskSchema');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const taskData = req.body; // Получаем данные задачи из тела запроса
        console.log('Creating task with data:', taskData);

        // Проверка существования пользователя
        const user = await User.findById(taskData.person);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Создание задачи
        const task = new Task(taskData);
        const savedTask = await task.save();
        console.log('Task created successfully:', savedTask);

        res.status(201).json(savedTask); // Возвращаем созданную задачу
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ message: 'Error creating task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const result = await taskService.deleteTask(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};
