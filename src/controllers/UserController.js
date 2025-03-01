const userService = require('../services/UserService');
const userValidations = require('../validations/UserValidations');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAllUsers();
        res.status(200).json({ 
            message: 'Users retrieved successfully',
            status: true, 
            success: true, 
            user 
        });
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
        res.status(200).json({ 
            message: 'User retrieved successfully',
            status: true, 
            success: true, 
            user 
        });
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

const createUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body; // Extract data from the request body

        const validation = userValidations.validateUser(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                status: false,
                success: false,
            });
        }

        const existingUser = await userService.findUserExists(email, phone);

        if (existingUser) {
            // const field = existingUser.email === email ? 'Email' : 'Phone number';
            return res.status(400).json({
                message: `User already exists`,
                status: false,
                success: false,
            });
        }

        // Call the service to create a user
        const user = await userService.createUser({ name, email, phone, password });

        res.status(201).json({ 
            message: 'User created successfully', 
            status: true, 
            success: true, 
            user 
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ 
            message: 'Error creating user', 
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
        res.status(200).json({ 
            message: 'User Updated successfully',
            status: true, 
            success: true, 
            user: updatedUser
        });
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
        res.status(200).json({ 
            message: 'User Deleted successfully',
            status: true, 
            success: true, 
        });
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

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUserById };
