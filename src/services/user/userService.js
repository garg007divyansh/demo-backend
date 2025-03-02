const { User } = require("../../models");

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

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUserById,
};
