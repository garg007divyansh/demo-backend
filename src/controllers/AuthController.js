const authService = require('../services/AuthService');
const userValidations = require('../validations/UserValidations');
const successHandler = require('../utils/successHandler');

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
        const { name, email, phone, password } = req.body; // Extract data from the request body

        const validation = userValidations.validateUser(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                status: false,
                success: false,
            });
        }

        const existingUser = await authService.findUserExists(email, phone);

        if (existingUser) {
            // const field = existingUser.email === email ? 'Email' : 'Phone number';
            return res.status(400).json({
                message: `User already exists`,
                status: false,
                success: false,
            });
        }

        // Call the service to create a user
        const user = await authService.createUser({ name, email, phone, password });

        // res.status(201).json({ 
        //     message: 'User created successfully', 
        //     status: true, 
        //     success: true, 
        //     user 
        // });
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