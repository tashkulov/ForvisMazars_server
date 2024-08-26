// models/UserSchema.js
const mongoose = require('mongoose');
const Task = require('./TaskSchema');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // Другие поля
});

UserSchema.pre('remove', async function(next) {
    try {
        await Task.deleteMany({ person: this._id });
        console.log(`Deleted tasks associated with user ${this._id}`);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);
