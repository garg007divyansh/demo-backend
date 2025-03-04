import { Roles } from '../../models/index.js';

export const getAllRoles = async () => {
    try {
        const roles = await Roles.find({id : {$nin: [1]}});
        return roles;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};
