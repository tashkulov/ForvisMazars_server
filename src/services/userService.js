const User = require('../models/UserSchema');

exports.createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

exports.updateUser = async (id, userData) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        user.name = userData.name || user.name;

        return await user.save();
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};
// controllers/userController.js
exports.deleteUser = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user: ' + error.message });
    }
};
