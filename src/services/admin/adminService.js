import { Users } from '../../models/index.js';

export const getAllUsers = async () => {
    try {
        const users = await Users.find();
        return users;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await Users.findById(id)
        return user;
    } catch (error) {
        throw new Error('Error fetching user by id: ' + error.message);
    }
};

export const updateUser = async (id, updatedData) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

export const deleteUserById = async (id) => {
    try {
        const user = await Users.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};
