import { successHandler } from '../../utils/index.js';
import { userService } from '../../services/index.js';

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