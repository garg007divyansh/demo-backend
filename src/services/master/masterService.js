const { Roles } = require("../../models");

const getAllRoles = async () => {
    try {
        const roles = await Roles.Roles.find({id : {$nin: [1]}});
        return roles;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

module.exports = {
    getAllRoles,
};
