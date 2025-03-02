const authService = require('../services/AuthService');

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
        console.log(response, 'response')
        // if (!response.user) {
        //     return res.status(404).json({
        //         message: 'User not found',
        //         status: false,
        //         success: false,
        //     });
        // }
        
        res.status(200).json({ 
            message: 'User login successfully', 
            status: true, 
            success: true, 
            token: response.token,
            data: response.user
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