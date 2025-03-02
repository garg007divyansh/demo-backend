const { authService } = require('../../services');
const { successHandler } = require('../../utils');
const { validateUser } = require('../../validations');

const loginUser = async (req, res) => {
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
        let data = {
            token: response.token,
            user: response.user
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

const createUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const validation = validateUser(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
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
        const user = await authService.createUser({ name, email, phone, password });
        successHandler(res, 201, 'Users created successfully', user);
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

module.exports = { loginUser, createUser };