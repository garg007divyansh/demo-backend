const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (userData) => {
    try {
        const user = await User.findOne({email: userData.email})
        if (!user) {
            throw new Error('User not found');
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        return {user, token};
    } catch (error) {
        throw new Error('Error login user: ' + error.message);
    }
};

module.exports = {
    loginUser,
};