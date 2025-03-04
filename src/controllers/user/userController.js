import { successHandler } from '../../utils/index.js';
import { userService } from '../../services/index.js';
import { validateUpdateUser } from '../../validations/index.js';

export const getUserByToken = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUserByToken(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'User retrieved successfully', user);
    } catch (error) {
        console.error('Error Fetching users:', error.message);
        res.status(500).json({
            message: 'Error Fetching users',
            status: false,
            success: false,
            error: error.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, phone } = req.body;
        const validation = validateUpdateUser(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                status: false,
                success: false,
            });
        }
        const user = await userService.updateUser(userId, { name, email, phone });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'User updated successfully', user);
    } catch (error) {
        console.error('Error updated user:', error.message);
        res.status(500).json({
            message: 'Error updated user',
            status: false,
            success: false,
            error: error.message
        });
    }
}