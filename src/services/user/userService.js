import { Users } from '../../models/index.js';

export const getUserByToken = async (userId) => {
    try {
        const users = await Users.findOne({ _id: userId });
        return users;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

export const updateUser = async (userId, data) => {
    try {
        const user = await Users.findByIdAndUpdate(userId, { $set: data }, { new: true });
        return user
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};