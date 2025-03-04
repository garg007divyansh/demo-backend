import { Users } from '../../models/index.js';

export const getUserByToken = async (userId) => {
    try {
        const users = await Users.findOne({ _id: userId });
        return users;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};