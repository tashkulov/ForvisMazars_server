const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.createTask = async (taskData) => {
    try {
        console.log('Creating task with data:', taskData);

        // Проверка существования пользователя
        const user = await User.findById(taskData.person);
        if (!user) {
            throw new Error('User not found');
        }

        const task = new Task(taskData);
        const savedTask = await task.save();
        console.log('Task created successfully:', savedTask);

        return savedTask;
    } catch (error) {
        console.error('Error creating task:', error.message);
        throw new Error('Error creating task: ' + error.message);
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
