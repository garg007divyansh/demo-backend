import mongoose from 'mongoose';
import { successHandler } from '../../utils/index.js';
import { adminService } from '../../services/index.js';

export const getAllUsers = async (req, res) => {
    try {
        const user = await adminService.getAllUsers();
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

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID',
                status: false,
                success: false,
            });
        }
        const user = await adminService.getUserById(id);
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

export const updateUser = async (req, res) => {
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
        const updatedUser = await adminService.updateUser(id, { name, email, phone });
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

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID',
                status: false,
                success: false,
            });
        }
        const user = await adminService.deleteUserById(id);
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
