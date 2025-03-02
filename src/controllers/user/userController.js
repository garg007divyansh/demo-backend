const mongoose = require('mongoose');
const { userService } = require('../../services');
const { successHandler } = require('../../utils');

const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAllUsers();
        successHandler(res, 200, 'Users retrieved successfully', user);
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Users retrieved successfully', user);
    } catch (error) {
        console.error('Error Fetching user:', error.message);
        res.status(500).json({ 
            message: 'Error Fetching user', 
            status: false, 
            success: false, 
            error: error.message 
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID',
                status: false,
                success: false,
            });
        }
        const updatedUser = await userService.updateUser(id, { name, email, phone });
        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found',
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Users updated successfully', updatedUser);
    } catch (error) {
        console.error('Error updated user:', error.message);
        res.status(500).json({ 
            message: 'Error updated user', 
            status: false, 
            success: false, 
            error: error.message 
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID',
                status: false,
                success: false,
            });
        }
        const user = await userService.deleteUserById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Users Deleted successfully', null);
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ 
            message: 'Error deleting user', 
            status: false, 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUserById };
