const authService = require('../services/AuthService');
const jwt = require('jsonwebtoken');

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
        const user = await authService.loginUser({ email, password });
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'User login successfully', 
            status: true, 
            success: true, 
            token,
            user 
        });
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

module.exports = { loginUser };