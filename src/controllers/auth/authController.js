import { validateUser } from '../../validations/index.js';
import { successHandler } from '../../utils/index.js';
import { authService } from '../../services/index.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and Password are required',
                status: false,
                success: false,
            });
        }
        const response = await authService.loginUser({ email, password });
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        let data = {
            token: response.token,
            id: response.user._id,
            name: response.user.name,
            email: response.user.email,
            phone: response.user.phone,
            roleId: response.user.roleId
        }
        successHandler(res, 200, 'Users login successfully', data);
    } catch (error) {
        console.error('Error login user:', error.message);
        res.status(500).json({ 
            message: 'Error login user', 
            status: false, 
            success: false, 
            error: error.message 
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, phone, password, roleId } = req.body;

        const validation = validateUser(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                status: false,
                success: false,
            });
        }
        if (roleId === 1) {
            return res.status(400).json({
                message: `RoleId 1 is not assignable`,
                status: false,
                success: false,
            });
        }

        const existingUser = await authService.findUserExists(email, phone);
        if (existingUser) {
            return res.status(400).json({
                message: `User already exists`,
                status: false,
                success: false,
            });
        }

        const response = await authService.register({ name, email, phone, password, roleId });
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        successHandler(res, 201, 'Users created successfully', response.user);
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

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: 'Email is required',
                status: false,
                success: false,
            });
        }
        const response = await authService.sendOtp(email);
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        let data = null
        successHandler(res, 200, 'OTP sent successfully to your email', data);
    } catch (error) {
        console.error('Error sending otp:', error.message);
        res.status(500).json({ 
            message: 'Error sending otp', 
            status: false, 
            success: false, 
            error: error.message 
        });
    }
};
