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
exports.deleteUser = async (id) => {
    if (!id) {
        throw new Error('ID is required');
    }

    try {
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new Error('User not found');
        }
        return true;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};