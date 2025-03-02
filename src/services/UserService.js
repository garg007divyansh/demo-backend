const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findById(id)
        return user;
    } catch (error) {
        throw new Error('Error fetching user by id: ' + error.message);
    }
};

const createUser = async (userData) => {
    try {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        const user = new User(userData); // Create a new User instance
        await user.save(); // Save the user to the database
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const updateUser = async (id, updatedData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUserById = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

const findUserExists = async (email, phone) => {
    return await User.findOne({ $or: [{ email }, { phone }] });
};

module.exports = {
    createUser,
    findUserExists,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
};
