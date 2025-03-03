const { masterService } = require('../../services');
const { successHandler } = require('../../utils');

const getAllRoles = async (req, res) => {
    try {
        const roles = await masterService.getAllRoles();
        successHandler(res, 200, 'Roles retrieved successfully', roles);
    } catch (error) {
        console.error('Error Fetching users:', error.message);
        res.status(500).json({ 
            message: 'Error Fetching users', 
            status: false, 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = { getAllRoles };